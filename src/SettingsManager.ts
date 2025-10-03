import * as vscode from 'vscode';

const HIGHLIGHT_COLOR = '#9a9a9aff';
const CONFIG_KEY = 'workbench.colorCustomizations';

type ColorsMap = Record<string, string | undefined>;
type ConfigTarget = 'Global' | 'Workspace';

export class SettingsManager {
  private static tempHighlights: Record<string, string> = {};
  private static pendingWrite: NodeJS.Timeout | null = null;
  private static lastWritePromise: Promise<void> = Promise.resolve();
  private static configTarget: ConfigTarget = 'Global';
  public static baseColors: ColorsMap = {};

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

  public static getConfigTarget(): ConfigTarget {
    return this.configTarget;
  }

  /**
   * Loads the current base colors from the VS Code configuration.
   */
  public static async loadBaseColors(): Promise<void> {
    const cfg = vscode.workspace.getConfiguration();
    const current = cfg.get<Record<string, string>>(CONFIG_KEY) || {};
    this.baseColors = { ...current };
  }

  /**
   * Temporarily highlights an element on hover.
   */
  public static async onHover(key: string): Promise<void> {
    if (this.tempHighlights[key]) return;
    this.tempHighlights[key] = HIGHLIGHT_COLOR;
    await this.applyEffectiveColors();
  }

  /**
   * Removes the temporary highlight when the mouse leaves.
   */
  public static async onLeave(key: string): Promise<void> {
    if (!this.tempHighlights[key]) return;
    delete this.tempHighlights[key];
    await this.applyEffectiveColors();
  }

  /**
   * Sets a persistent color for an element.
   */
  public static async onSetColor(key: string, color: string): Promise<void> {
    if (!color || color.trim() === '') {
      delete this.baseColors[key];
    } else {
      this.baseColors[key] = color.trim();
    }
    await this.applyEffectiveColors();
  }

  /**
   * Applies the effective color customizations to VS Code.
   */
  public static async applyEffectiveColors(): Promise<void> {
    if (this.pendingWrite) clearTimeout(this.pendingWrite);
    this.pendingWrite = setTimeout(() => {
      this.pendingWrite = null;
      const config = vscode.workspace.getConfiguration();
      // Only include keys that are set in baseColors or tempHighlights
      const effective: ColorsMap = {};

      // Apply persistent colors
      Object.entries(this.baseColors).forEach(([k, v]) => {
        if (v !== undefined) effective[k] = v;
      });

      // Apply temporary highlights (overrides persistent)
      Object.entries(this.tempHighlights).forEach(([k, v]) => {
        effective[k] = v;
      });

      this.lastWritePromise = this.lastWritePromise
        .then(() => config.update(CONFIG_KEY, effective, this.toVscodeConfigTarget(this.configTarget)))
        .catch((err) => console.error('Failed to update:', err));
    }, 10);
  }
}
