import * as vscode from 'vscode';
import { ELEMENTS } from './ElementRegistry';
import { ItemSetting } from './models/ItemSetting';
import { ElementSetting } from './interfaces/ElementSetting';

const HIGHLIGHT_COLOR = '#9a9a9aff';
const COLOR_CUSTOMIZATION_KEY = 'workbench.colorCustomizations';

type SettingsMap = Record<string, any>;
type ConfigTarget = 'Global' | 'Workspace';

export class SettingsManager {
  private static tempHighlights: Record<string, string> = {};
  private static pendingWrite: NodeJS.Timeout | null = null;
  private static lastWritePromise: Promise<void> = Promise.resolve();
  private static configTarget: ConfigTarget = 'Global';
  public static isHighlightingEnabled: boolean = true;
  public static baseSettings: ItemSetting[] = [];

  /**
   * Maps a string config target to the corresponding VS Code enum.
   */
  public static toVscodeConfigTarget(target: ConfigTarget): vscode.ConfigurationTarget {
    return target === 'Workspace' ? vscode.ConfigurationTarget.Workspace : vscode.ConfigurationTarget.Global;
  }

  /**
   * Sets the configuration target for updates.
   */
  public static setConfigTarget(target: ConfigTarget): void {
    this.configTarget = target;
  }

  /**
   * Gets the current configuration target.
   */
  public static getConfigTarget(): ConfigTarget {
    return this.configTarget;
  }

  /**
   * Gets the current configuration target in VS Code enum form.
   */
  public static getVscodeConfigTarget(): vscode.ConfigurationTarget {
    return this.toVscodeConfigTarget(this.configTarget);
  }

  /**
   * Loads the current base settings from the VS Code configuration.
   */
  public static loadBaseSettings(): void {
    const config = vscode.workspace.getConfiguration();
    ELEMENTS.forEach(element => {
      element.settings.forEach(setting => {
        const settings = config.get<Record<string, string>>(setting.section, {});
        Object.entries(settings || {}).forEach(([key, value]) => {
          if (setting.key === key) {
            console.log(`Push setting: ${setting.section} ${key} ${value}`);
            this.baseSettings.push(new ItemSetting(setting.section, key, value));
            return;
          }
        });
      });
    });
  }

  /**
   * Temporarily highlights an element on hover.
   */
  public static async onHover(key: string): Promise<void> {
    if (!this.isHighlightingEnabled || this.tempHighlights[key]) return;
    this.tempHighlights[key] = HIGHLIGHT_COLOR;
    await this.applyEffectiveColors();
  }

  /**
   * Removes the temporary highlight when the mouse leaves.
   */
  public static async onLeave(key: string): Promise<void> {
    if (!this.isHighlightingEnabled || !this.tempHighlights[key]) return;
    delete this.tempHighlights[key];
    await this.applyEffectiveColors();
  }

  /**
   * Sets a persistent color for an element.
   */
  public static async onSetColor(setting: ElementSetting, color: string): Promise<void> {
    if (!color || color.trim() === '') {
      this.removeSetting(setting.section, setting.key);
    } else {
      this.addOrUpdateSetting(setting.section, setting.key, color);
    }
    await this.applyEffectiveColors();
  }

  /**
   * Handles other number settings like font size.
   */
  public static async onSetNumber(setting: ElementSetting, value: string): Promise<void> {
    this.addOrUpdateSetting(setting.section, setting.key, value);
    const config = vscode.workspace.getConfiguration(setting.section);
    await config.update(setting.key, parseInt(value), SettingsManager.getVscodeConfigTarget());
  }

  /**
   * Handles string settings like font family.
   */
  public static async onSetString(setting: ElementSetting, value: string): Promise<void> {
    this.addOrUpdateSetting(setting.section, setting.key, value);
    const config = vscode.workspace.getConfiguration(setting.section);
    await config.update(setting.key, value, SettingsManager.getVscodeConfigTarget());
  }

  /**
   * Reset all settings in the given group (element) to their defaults.
   */
  public static resetGroup(groupLabel: string): void {
    console.log(`Resetting group: ${groupLabel}`);
    if (!groupLabel) {
      return;
    }

    let elementsToReset = ELEMENTS.find(g => g.label === groupLabel);
    if (!elementsToReset) {
      console.warn(`No group found with label ${groupLabel}`);
      return;
    }

    const config = vscode.workspace.getConfiguration();
    elementsToReset.settings.forEach(setting => {
      this.resetElement(setting, config);
    });
  }

  /**
   * Reset a specific element setting to its default value.
   */
  public static resetElement(setting: ElementSetting, config?: vscode.WorkspaceConfiguration): void {
    config = config || vscode.workspace.getConfiguration();
    console.log(`Resetting element: ${setting.section}.${setting.key}`);
    config.update(`${setting.section}.${setting.key}`, undefined, SettingsManager.getVscodeConfigTarget());
    this.removeSetting(setting.section, setting.key);
    delete this.tempHighlights[setting.key];
  }

  /**
   * Reset the given configuration target only.
   */
  public static resetScope(scope: 'Global' | 'Workspace'): void {
    console.log(`Resetting scope: ${scope}`);
    ELEMENTS.map(e => e.label).forEach(group => {
      this.resetGroup(group);
    });
    this.baseSettings = [];
    this.tempHighlights = {};
  }

  /**
   * Applies the effective color customizations to VS Code.
   */
  public static async applyEffectiveColors(): Promise<void> {
    if (this.pendingWrite) clearTimeout(this.pendingWrite);
    this.pendingWrite = setTimeout(() => {
      this.pendingWrite = null;
      const config = vscode.workspace.getConfiguration();
      const effective: SettingsMap = {};

      // Apply persistent colors
      this.baseSettings.forEach((setting) => {
        if (setting.value !== undefined && setting.section === COLOR_CUSTOMIZATION_KEY) {
          effective[setting.key] = setting.value;
        }
      });

      // Apply temporary highlights (overrides persistent)
      Object.entries(this.tempHighlights).forEach(([key, value]) => {
        effective[key] = value;
      });

      this.lastWritePromise = this.lastWritePromise
        .then(() => {
          console.log('UPDATING color customizations with:', effective);
          return config.update(COLOR_CUSTOMIZATION_KEY, effective, this.toVscodeConfigTarget(this.configTarget));
        })
        .catch((err) => console.error('Failed to update:', err));
    }, 10);
  }

  /**
   * Gets the current value of a setting from the base settings.
   */
  public static getSettingValue(section: string, key: string): string | undefined {
    return this.baseSettings.find(s => s.section === section && s.key === key)?.value;
  }

  private static removeSetting(section: string, key: string): void {
    this.baseSettings = this.baseSettings.filter(s => !(s.section === section && s.key === key));
  }

  private static addOrUpdateSetting(section: string, key: string, value: string): void {
    console.log(`Push setting: ${section} ${key} ${value}`);
    const existing = this.baseSettings.find(s => s.section === section && s.key === key);
    if (existing) {
      existing.value = value;
    } else {
      this.baseSettings.push(new ItemSetting(section, key, value));
    }
  }
}
