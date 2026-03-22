import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { SettingsManager } from './SettingsManager';
import { ELEMENTS } from './ElementRegistry';
import { ElementDefinition } from './interfaces/ElementDefinition';
import { ElementSetting } from './interfaces/ElementSetting';

export class SidebarProvider implements vscode.WebviewViewProvider {
  constructor(private readonly extensionUri: vscode.Uri) { }

  public async resolveWebviewView(webviewView: vscode.WebviewView): Promise<void> {
    try {
      SettingsManager.loadBaseSettings();
      webviewView.webview.options = { enableScripts: true };
      webviewView.webview.html = await this.getHtml(webviewView.webview, ELEMENTS);

      this.setupThemeListener(webviewView);
      this.setupStateManagement(webviewView);
      this.setupMessageHandler(webviewView);

      webviewView.onDidChangeVisibility(async () => {
        if (webviewView.visible) {
          await this.refreshUI(webviewView);
        }
      });
    } catch (err) {
      console.error('Failed to resolve webview view:', err);
    }
  }

  private refreshWorkspaceAvailability(webviewView: vscode.WebviewView): void {
    const workspaceAvailable = !!vscode.workspace.workspaceFolders?.length;
    if (workspaceAvailable && SettingsManager.getConfigTarget() === 'Global') {
      SettingsManager.setConfigTarget('Workspace');
    }
    if (!workspaceAvailable && SettingsManager.getConfigTarget() !== 'Global') {
      SettingsManager.setConfigTarget('Global');
    }
    webviewView.webview.postMessage({
      type: 'workspaceAvailability',
      available: workspaceAvailable,
      configTarget: SettingsManager.getConfigTarget(),
    });
  }

  private setupThemeListener(webviewView: vscode.WebviewView): void {
    const postTheme = (kind: vscode.ColorThemeKind) => {
      const themeClass = kind === vscode.ColorThemeKind.Dark ? 'vscode-dark'
        : kind === vscode.ColorThemeKind.Light ? 'vscode-light'
        : 'vscode-high-contrast';
      webviewView.webview.postMessage({ type: 'setTheme', theme: themeClass });
    };
    postTheme(vscode.window.activeColorTheme.kind);
    vscode.window.onDidChangeActiveColorTheme(e => postTheme(e.kind));
  }

  private setupStateManagement(webviewView: vscode.WebviewView): void {
    this.refreshWorkspaceAvailability(webviewView);
  }

  private setupMessageHandler(webviewView: vscode.WebviewView): void {
    webviewView.webview.onDidReceiveMessage(async (msg) => {
      try {
        switch (msg.type) {
          case 'toggleHighlighting':
            SettingsManager.isHighlightingEnabled = msg.enabled;
            break;
          case 'hover':
            await SettingsManager.onHover(msg.key);
            break;
          case 'leave':
            await SettingsManager.onLeave(msg.key);
            break;
          case 'setColor':
            await SettingsManager.onSetColor(msg.section, msg.key, msg.color);
            break;
          case 'setNumber':
            await SettingsManager.onSetNumber(msg.section, msg.key, msg.value);
            break;
          case 'setString':
            await SettingsManager.onSetString(msg.section, msg.key, msg.value);
            break;
          case 'setConfigTarget':
            SettingsManager.setConfigTarget(msg.target);
            this.refreshWorkspaceAvailability(webviewView);
            break;
          case 'requestState':
            this.refreshWorkspaceAvailability(webviewView);
            break;
          case 'resetScope':
            this.withConfirmation(`Are you sure you want to reset ${msg.target} settings?`, async () => {
              SettingsManager.resetScope(msg.target);
              await this.refreshUI(webviewView);
              vscode.window.showInformationMessage(`${msg.target} settings reset`);
            });
            break;
          case 'resetGroup':
            this.withConfirmation(`Are you sure you want to reset ${msg.label} settings?`, async () => {
              SettingsManager.resetGroup(msg.label);
              await this.refreshUI(webviewView);
              vscode.window.showInformationMessage(`${msg.label} settings reset`);
            });
            break;
          case 'consoleLog':
            console.log(msg.message);
            break;
          default:
            console.warn('Unknown message type:', msg.type);
        }
      } catch (err) {
        console.error('Error handling message:', err);
      }
    });
  }

  private async withConfirmation(message: string, action: () => Promise<void>, isModal: boolean = true): Promise<void> {
    const result = await vscode.window.showInformationMessage(message, { modal: isModal }, 'Yes');
    if (result === 'Yes') {
      await action();
    }
  }

  private async refreshUI(webviewView: vscode.WebviewView): Promise<void> {
    console.log('Refreshing UI with latest settings...');
    SettingsManager.applyEffectiveColors();
    webviewView.webview.html = ''; // clear before updating to prevent flash of old content
    webviewView.webview.html = await this.getHtml(webviewView.webview, ELEMENTS);
    this.refreshWorkspaceAvailability(webviewView);
  }

  private async handleWebviewMessage(msg: any, sendState: () => void): Promise<void> {
    switch (msg.type) {
      case 'hover':
        await SettingsManager.onHover(msg.key);
        break;
      case 'leave':
        await SettingsManager.onLeave(msg.key);
        break;
      case 'setColor':
        await SettingsManager.onSetColor(msg.section, msg.key, msg.color);
        break;
      case 'setNumber':
        await SettingsManager.onSetNumber(msg.section, msg.key, msg.value);
        break;
      case 'setString':
        await SettingsManager.onSetString(msg.section, msg.key, msg.value);
        break;
      case 'setConfigTarget':
        SettingsManager.setConfigTarget(msg.target);
        sendState();
        break;
      case 'requestState':
        sendState();
        break;
      default:
        console.warn('Unknown message type:', msg.type);
    }
  }

  /**
   * Ensures the color value is a valid hex string (6 or 8 digits for RGBA).
   */
  private sanitizeHex(value?: string): string {
    if (!value) return ''; // no customization defined
    // Accept both 6-digit (#RRGGBB) and 8-digit (#RRGGBBAA) hex colors
    return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value) ? value : '';
  }

  private async getHtml(webview: vscode.Webview, elements: ElementDefinition[]): Promise<string> {
    const scriptUri = this.getScriptUri(webview);
    const styleSidebarUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'media', 'sidebar.css')
    );

    const itemsHtml = elements.map((el, idx) => this.generateElementHtml(el, idx)).join('\n');
    return this.loadAndReplaceTemplate(webview.cspSource, styleSidebarUri.toString(), itemsHtml, scriptUri.toString());
  }

  private getScriptUri(webview: vscode.Webview): vscode.Uri {
    const candidates = [
      ['out', 'webview', 'sidebar.js'],
      ['webview', 'sidebar.js'],
      ['src', 'webview', 'sidebar.js'],
    ];
    for (const parts of candidates) {
      const candidate = vscode.Uri.joinPath(this.extensionUri, ...parts);
      if (fs.existsSync(candidate.fsPath)) {
        return webview.asWebviewUri(candidate);
      }
    }
    // Fallback to the first path (packaged vs. dev) so URI is still returned
    const fallback = vscode.Uri.joinPath(this.extensionUri, 'out', 'webview', 'sidebar.js');
    return webview.asWebviewUri(fallback);
  }

  private generateElementHtml(el: ElementDefinition, idx: number): string {
    const settingsHtml = el.settings.map(setting => `
      <div class="setting-item">
        <span class="setting-label" data-key="${setting.key}" title="${setting.description}">
          ${setting.label}
        </span>
        ${this.getInputHtml(setting)}
      </div>`).join('');
    const keyList = el.settings.map(s => s.key).join(',');
    return `
      <div class="element-group" data-group="${idx}" data-keys="${keyList}" data-label="${el.label}">
        <button class="element-header" tabindex="0" data-group="${idx}">
          <div class="element-header-icons">
            <span class="expand-icon">+</span>
          </div>
          <span class="element-header-title">${el.label}</span>
          <span class="reset-element" title="Reset all the customizations for the ${el.label}">&#x21bb;</span>
        </button>
        <div class="element-settings" style="display:none;">
          <span>${el.description}</span>
          ${settingsHtml}
        </div>
      </div>`;
  }

  private loadAndReplaceTemplate(cspSource: string, styleSidebarUri: string, itemsHtml: string, scriptUri: string): string {
    const candidates = [
      path.join(this.extensionUri.fsPath, 'out', 'webview', 'sidebar.html'),
      path.join(this.extensionUri.fsPath, 'webview', 'sidebar.html'),
      path.join(this.extensionUri.fsPath, 'src', 'webview', 'sidebar.html'),
    ];
    for (const htmlPath of candidates) {
      try {
        if (fs.existsSync(htmlPath)) {
          const html = fs.readFileSync(htmlPath, 'utf8');
          return html
            .replace('{{cspSource}}', cspSource)
            .replace('{{styleSidebarUri}}', styleSidebarUri)
            .replace('{{itemsHtml}}', itemsHtml)
            .replace('{{scriptUri}}', scriptUri);
        }
      } catch (err) {
        console.error('Failed to read sidebar.html at', htmlPath, err);
      }
    }
    console.error('sidebar.html not found in any expected locations:', candidates);
    return '<main><p>Failed to load sidebar UI.</p></main>';
  }

  private getInputHtml(setting: ElementSetting): string {
    switch (setting.type) {
      case 'color':
        return this.getColorInput(setting);
      case 'number':
        return this.getNumberInput(setting);
      case 'string':
        return setting.options ? this.getSelectInput(setting) : this.getTextInput(setting);
      default:
        return '';
    }
  }

  private getColorInput(setting: ElementSetting): string {
    const color = this.sanitizeHex(SettingsManager.getSettingValue(setting.section, setting.key));
    const defaultColor = '#000000';

    // Extract RGB (6 chars) and alpha (2 chars) from the color value
    let rgbColor = defaultColor; // default RGB
    let alphaPercent = '100'; // default opacity
    
    if (color) {
      if (color.length === 9) {
        // 8-digit hex: #RRGGBBAA
        rgbColor = color.substring(0, 7);
        const alphaHex = color.substring(7, 9);
        alphaPercent = String(Math.round((parseInt(alphaHex, 16) / 255) * 100));
      } else if (color.length === 7) {
        // 6-digit hex: #RRGGBB
        rgbColor = color;
      }
    }
    
    return `
      <div class="color-input-group" data-section="${setting.section}" data-key="${setting.key}">
        <input type="color" class="picker color-rgb input-style" title="${!color ? "Color is not customized." : rgbColor}" data-section="${setting.section}" data-key="${setting.key}" value="${rgbColor}" />
        <div class="opacity-control">
          <input
            type="range"
            class="opacity-slider"
            title="Opacity: ${alphaPercent}%"
            data-section="${setting.section}" data-key="${setting.key}"
            min="0"
            max="100"
            value="${alphaPercent}" />
        </div>
      </div>`;
  }

  private getNumberInput(setting: ElementSetting): string {
    const currentValue = SettingsManager.getSettingValue(setting.section, setting.key);
    const value: number = currentValue ? parseInt(currentValue) || 0 : 0;
    return `
      <div class="number-input-wrapper">
        <input
          type="number"
          class="number-input input-style"
          data-section="${setting.section}"
          data-key="${setting.key}"
          value="${value ? value : ''}"
          min="6"
          max="100"
          step="1" />
        <button type="button" class="number-up" data-key="${setting.key}" title="Increase">▲</button>
        <button type="button" class="number-down" data-key="${setting.key}" title="Decrease">▼</button>
      </div>`;
  }

  private getSelectInput(setting: ElementSetting): string {
    const value = SettingsManager.getSettingValue(setting.section, setting.key) || '';
    const options = (setting.options || []).map(opt =>
      `<option value="${opt}" ${opt === value || (!setting.options?.includes(value) && opt === 'default') ? 'selected' : ''}>
        ${opt.charAt(0).toUpperCase() + opt.slice(1)}
      </option>`
    ).join('');
    return `
      <select class="position-select input-style" data-section="${setting.section}" data-key="${setting.key}">
        <option selected value="" disabled>
        </option>${options}
      </select>`;
  }

  private getTextInput(setting: ElementSetting): string {
    const value = SettingsManager.getSettingValue(setting.section, setting.key) || '';
    return `
      <input
        type="text"
        class="string-input input-style"
        data-section="${setting.section}"
        data-key="${setting.key}"
        value="${value}" />`;
  }
}
