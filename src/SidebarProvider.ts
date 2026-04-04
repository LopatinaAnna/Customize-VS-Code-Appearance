import * as vscode from 'vscode';
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
            await SettingsManager.onSetColor(msg.setting, msg.color);
            break;
          case 'setNumber':
            await SettingsManager.onSetNumber(msg.setting, msg.value);
            break;
          case 'setString':
            await SettingsManager.onSetString(msg.setting, msg.value);
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
              SettingsManager.applyEffectiveColors();
              await this.refreshGroupUI(webviewView, msg.label);
              vscode.window.showInformationMessage(`${msg.label} settings reset`);
            });
            break;
          case 'resetElement':
            SettingsManager.resetElement(msg.setting);
            SettingsManager.applyEffectiveColors();
            await this.refreshElementUI(webviewView, msg.setting);
            vscode.window.showInformationMessage(`${msg.setting.label} reset`);
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

  private async refreshGroupUI(webviewView: vscode.WebviewView, label: string): Promise<void> {
    console.log(`Refreshing UI for group: ${label}`);
    const group = ELEMENTS.find(g => g.label === label);
    if (group) {
      for (const setting of group.settings) {
        await this.refreshElementUI(webviewView, setting);
      }
    }
    let elementsToRefresh = ELEMENTS.find(g => g.label === label);
    if (!elementsToRefresh) {
      console.warn(`No group found with label ${label}`);
      return;
    }
    
    elementsToRefresh.settings.forEach(setting => {
      this.refreshElementUI(webviewView, setting);
    });
  }

  private async refreshElementUI(webviewView: vscode.WebviewView, setting: ElementSetting): Promise<void> {
    console.log(`Refreshing UI for element: ${setting.section}.${setting.key}`);
    const elementHtml = this.getInputHtml(setting);
    webviewView.webview.postMessage({
      type: 'replaceElement',
      newHtml: elementHtml,
      section: setting.section,
      key: setting.key,
      elementType: setting.type,
      options: setting.options
    });
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
    return webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'out', 'webview', 'sidebar.js')
    );
  }

  private generateElementHtml(el: ElementDefinition, idx: number): string {
    const settingsHtml = el.settings.map(setting => `
      <div class="setting-item">
        <span class="setting-label" data-key="${setting.key}" title="${setting.description}">
          ${setting.label}
        </span>
        ${this.getInputHtml(setting)}
      </div>`).join('');

    return `
      <div class="element-group" data-group="${idx}" data-label="${el.label}">
        <div class="element-group-container">
          <button class="element-header" tabindex="0" data-group="${idx}">
            <div class="element-header-icons">
              <span class="expand-icon">+</span>
            </div>
            <span class="element-header-title">${el.label}</span>
            <span class="reset-group" title="Reset all the customizations for the ${el.label}">&#x21bb;</span>
          </button>
          <div class="element-group-description">${el.description}</div>
        </div>
        <div class="element-settings" style="display:none;">
          ${settingsHtml}
        </div>
      </div>`;
  }

  private loadAndReplaceTemplate(cspSource: string, styleSidebarUri: string, itemsHtml: string, scriptUri: string): string {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${cspSource};">
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="${styleSidebarUri}" rel="stylesheet">
          <title>Customize VS Code Appearance</title>
        </head>
        <body class="vscode-light">
          <main>
            <nav aria-label="Configuration target" class="button-group">
              <div class="scope-control">
                <button id="btn-global" type="button" class="config-btn" aria-pressed="false">Global (User)</button>
                <span class="scope-reset" data-target="Global" title="Reset customizations for elements listed below in the Global (User) scope.">&#x21bb;</span>
              </div>
              <div class="scope-control">
                <button id="btn-workspace" type="button" class="config-btn" aria-pressed="false">Workspace</button>
                <span class="scope-reset" data-target="Workspace" title="Reset customizations for elements listed below in the Workspace scope.">&#x21bb;</span>
              </div>
              <div class="scope-control">
                <input type="checkbox" id="enableHighlighting" class="checkbox-input" checked>
                <label for="enableHighlighting">Enable Highlighting</label>
              </div>
            </nav>
            <section aria-label="Color Customizations" class="element-list">
              ${itemsHtml}
            </section>
          </main>
          <script src="${scriptUri}"><\/script>
        </body>
      </html>`;
    return htmlTemplate;
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
      <div id="${setting.section}.${setting.key}" class="element-row" data-setting="${encodeURIComponent(JSON.stringify(setting))}">
        <div class="color-input-group">
          <input type="color" class="picker color-rgb input-style" title="${!color ? "Color is not customized yet. Click to pick a color." : rgbColor}" value="${rgbColor}" />
          <div class="opacity-control">
            <input
              type="range"
              id="opacity-${setting.key}"
              class="opacity-slider"
              title="Opacity: ${alphaPercent}%"
              min="0"
              max="100"
              value="${alphaPercent}" />
          </div>
          <span class="reset-element" title="Reset">&#x21bb;</span>
        </div>
      </div>`;
  }

  private getNumberInput(setting: ElementSetting): string {
    const currentValue = SettingsManager.getSettingValue(setting.section, setting.key);
    const value: number = currentValue ? parseInt(currentValue) || 0 : 0;
    return `
      <div id="${setting.section}.${setting.key}" class="element-row" data-setting="${encodeURIComponent(JSON.stringify(setting))}">
        <div class="number-input-wrapper">
          <input
            type="number"
            class="number-input input-style"
            value="${value ? value : setting.defaultValue || ''}"
            min="6"
            max="100"
            step="1" />
          <button type="button" class="number-up" title="Increase">▲</button>
          <button type="button" class="number-down" title="Decrease">▼</button>
        </div>
        <span class="reset-element" title="Reset">&#x21bb;</span>
      </div>`;
  }

  private getSelectInput(setting: ElementSetting): string {
    const value = SettingsManager.getSettingValue(setting.section, setting.key) || setting.defaultValue || '';
    const options = (setting.options || []).map(opt =>
      `<option value="${opt}" ${opt === value || opt === setting.defaultValue ? 'selected' : ''}>
        ${opt.charAt(0).toUpperCase() + opt.slice(1)}
      </option>`
    ).join('');
    return `
      <div id="${setting.section}.${setting.key}" class="element-row" data-setting="${encodeURIComponent(JSON.stringify(setting))}">
        <select class="select-input input-style">
          <option selected value="" disabled>
          </option>${options}
        </select>
        <span class="reset-element" title="Reset">&#x21bb;</span>
      </div>`;
  }

  private getTextInput(setting: ElementSetting): string {
    const value = SettingsManager.getSettingValue(setting.section, setting.key) || setting.defaultValue || '';
    return `
      <div id="${setting.section}.${setting.key}" class="element-row" data-setting="${encodeURIComponent(JSON.stringify(setting))}">
        <input
          type="text"
          class="string-input input-style"
          value="${value}" />
        <span class="reset-element" title="Reset">&#x21bb;</span>
      </div>`;
  }
}
