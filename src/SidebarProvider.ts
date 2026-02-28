import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { SettingsManager } from './SettingsManager';
import { ELEMENTS, ElementDefinition, ElementSetting } from './ElementRegistry';

export class SidebarProvider implements vscode.WebviewViewProvider {
  constructor(private readonly extensionUri: vscode.Uri) { }

  public async resolveWebviewView(webviewView: vscode.WebviewView): Promise<void> {
    try {
      //console.log(vscode.workspace.getConfiguration());
      for (const [key, value] of Object.entries(vscode.workspace.getConfiguration().inspect('workbench') || {})) {
        console.log(value);
      }
      await SettingsManager.loadBaseColors();
      webviewView.webview.options = { enableScripts: true };
      webviewView.webview.html = await this.getHtml(webviewView.webview, ELEMENTS);

      // send current color theme and update on change
      const postTheme = (kind: vscode.ColorThemeKind) => {
        const themeClass = kind === vscode.ColorThemeKind.Dark ? 'vscode-dark'
                          : kind === vscode.ColorThemeKind.Light ? 'vscode-light'
                          : 'vscode-high-contrast';
        webviewView.webview.postMessage({ type: 'setTheme', theme: themeClass });
      };
      postTheme(vscode.window.activeColorTheme.kind);
      vscode.window.onDidChangeActiveColorTheme(e => postTheme(e.kind));

      const sendState = () => {
        const workspaceAvailable = !!vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0;
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

      webviewView.webview.onDidReceiveMessage(async (msg) => {
        try {
          await this.handleWebviewMessage(msg, sendState);
        } catch (err) {
          console.error('Error handling message:', err);
        }
      });
    } catch (err) {
      console.error('Failed to resolve webview view:', err);
    }
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
   * Ensures the color value is a valid hex string.
   */
  private sanitizeHex(value?: string): string {
    if (!value) return '#000000';
    return /^#([0-9a-fA-F]{6})$/.test(value) ? value : '#000000';
  }

  /**
   * Generates the HTML for the sidebar webview.
   */
  private async getHtml(webview: vscode.Webview, elements: ElementDefinition[]): Promise<string> {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'out', 'webview', 'sidebar.js')
    );
    const styleSidebarUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'media', 'sidebar.css')
    );

    const itemsHtml = elements.map((el, idx) => {
      const settingsHtml = el.settings.map(setting => {
        return `
          <div class="setting-item" data-key="${setting.key}">
            <span>${setting.label}</span>
            ${this.getInputHtml(setting)}
          </div>`;
      }).join('');
      return `
        <div class="element-group" data-group="${idx}">
          <div class="element-header" tabindex="0" data-group="${idx}">
            <span>${el.label}</span>
            <span class="expand-icon">&#9654;</span>
          </div>
          <div class="element-settings" style="display:none;">
            ${settingsHtml}
          </div>
        </div>
      `;
    }).join('\n');

    const htmlPath = path.join(this.extensionUri.fsPath, 'src', 'webview', 'sidebar.html');
    let html = '';
    try {
      html = fs.readFileSync(htmlPath, 'utf8');
    } catch (err) {
      console.error('Failed to read sidebar.html:', err);
      return '<main><p>Failed to load sidebar UI.</p></main>';
    }

    return html
      .replace('{{cspSource}}', webview.cspSource)
      .replace('{{styleSidebarUri}}', styleSidebarUri.toString())
      .replace('{{itemsHtml}}', itemsHtml)
      .replace('{{scriptUri}}', scriptUri.toString());
  }

  private getInputHtml(setting: ElementSetting): string {
    const opts = setting.options ?? [];

    if (setting.type === 'color') {
      const color = this.sanitizeHex(SettingsManager.baseColors[setting.key]);
      return `<input type="color" class="picker input-style" data-key="${setting.key}" value="${color}" />`;
    } 
    
    if (setting.type === 'number') {
      const value = SettingsManager.baseColors[setting.key] || '';
      return `<input type="number" class="number-input input-style" data-key="${setting.key}" value="${value}" />`;
    } 
    
    if (setting.type === 'string' && !!setting.options) {
      let options = opts.map(opt => {
        return `<option value="${opt}">${opt.charAt(0).toUpperCase() + opt.slice(1)}</option>`;
      }).join('');
      return `<select class="position-select input-style" data-key="${setting.key}"><option selected value="" disabled></option>${options}</select>`;
    } 
    
    if (setting.type === 'string') {
      const value = SettingsManager.baseColors[setting.key] || '';
      return `<input type="text" class="string-input input-style" data-key="${setting.key}" value="${value}" />`;
    }

    return '<!-- Unsupported setting type -->';
  }
}
