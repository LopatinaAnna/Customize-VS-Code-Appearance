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
      await SettingsManager.loadBaseColors();
      webviewView.webview.options = { enableScripts: true };
      webviewView.webview.html = await this.getHtml(webviewView.webview, ELEMENTS);

      this.setupThemeListener(webviewView);
      this.setupStateManagement(webviewView);
      this.setupMessageHandler(webviewView);
    } catch (err) {
      console.error('Failed to resolve webview view:', err);
    }
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
    const sendState = () => {
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
    };
    sendState();
  }

  private setupMessageHandler(webviewView: vscode.WebviewView): void {
    const sendState = () => {
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
    };

    webviewView.webview.onDidReceiveMessage(async (msg) => {
      try {
        if (msg.type === 'resetScope' && (msg.target === 'Global' || msg.target === 'Workspace')) {
          await SettingsManager.resetScope(msg.target);
          await this.refreshUI(webviewView, sendState);
          vscode.window.showInformationMessage(`${msg.target} settings reset`);
          return;
        }
        if (msg.type === 'resetGroup' && Array.isArray(msg.keys)) {
          await SettingsManager.resetGroup(msg.keys);
          await this.refreshUI(webviewView, sendState);
          vscode.window.showInformationMessage('Group settings reset');
          return;
        }
        await this.handleWebviewMessage(msg, sendState);
      } catch (err) {
        console.error('Error handling message:', err);
      }
    });
  }

  private async refreshUI(webviewView: vscode.WebviewView, sendState: () => void): Promise<void> {
    await SettingsManager.loadBaseColors();
    webviewView.webview.html = await this.getHtml(webviewView.webview, ELEMENTS);
    sendState();
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
        await SettingsManager.onSetColor(msg.key, msg.color);
        break;
      case 'setNumber':
        await SettingsManager.onSetNumber(msg.key, msg.value);
        break;
      case 'setString':
        await SettingsManager.onSetString(msg.key, msg.value);
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
            <span class="setting-label" data-key="${setting.key}">${setting.label}</span>
            ${this.getInputHtml(setting)}
          </div>`).join('');
    const keyList = el.settings.map(s => s.key).join(',');
    return `<div class="element-group" data-group="${idx}" data-keys="${keyList}">
          <button class="element-header" tabindex="0" data-group="${idx}">
            <div class="element-header-icons">
              <span class="expand-icon">+</span>
            </div>
            <span class="element-header-title">${el.label}</span>
            <span class="reset-element" title="Reset all the customizations for the ${el.label}">&#x21bb;</span>
          </button>
          <div class="element-settings" style="display:none;">
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
    const color = this.sanitizeHex(SettingsManager.baseColors[setting.key]);
    
    // Extract RGB (6 chars) and alpha (2 chars) from the color value
    let rgbColor = '#000000'; // default RGB
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

    const isDefault = rgbColor == '#000000';
    
    return `<div class="color-input-group" data-key="${setting.key}">
      <span class="default-label" title="${isDefault ? "Color is not customized." : ""}">${isDefault ? "★" : ""}</span>
      <input type="color" class="picker color-rgb input-style" data-key="${setting.key}" value="${rgbColor}" />
      <div class="opacity-control">
        <input type="range" class="opacity-slider" title="Opacity: ${alphaPercent}%" data-key="${setting.key}" min="0" max="100" value="${alphaPercent}" />
      </div>
    </div>`;
  }

  private getNumberInput(setting: ElementSetting): string {
    const value = SettingsManager.baseColors[setting.key] || '';
    return `<input type="number" class="number-input input-style" data-key="${setting.key}" value="${value}" />`;
  }

  private getSelectInput(setting: ElementSetting): string {
    const options = (setting.options || []).map(opt =>
      `<option value="${opt}">${opt.charAt(0).toUpperCase() + opt.slice(1)}</option>`
    ).join('');
    return `<select class="position-select input-style" data-key="${setting.key}"><option selected value="" disabled></option>${options}</select>`;
  }

  private getTextInput(setting: ElementSetting): string {
    const value = SettingsManager.baseColors[setting.key] || '';
    return `<input type="text" class="string-input input-style" data-key="${setting.key}" value="${value}" />`;
  }
}
