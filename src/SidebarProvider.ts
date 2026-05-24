import * as vscode from 'vscode';
import { SettingsManager } from './SettingsManager';
import { ELEMENTS } from './ElementRegistry';
import { ElementDefinition } from './interfaces/ElementDefinition';
import { ElementSetting } from './interfaces/ElementSetting';

export class SidebarProvider implements vscode.WebviewViewProvider {
  private themeColors: Record<string, string> = {};
  private currentTheme: string = '';

  constructor(private readonly extensionUri: vscode.Uri) { }

  /**
   * Resolves and initializes the WebView for the sidebar.
   *
   * Sets up HTML content, event listeners, state management, and message handling.
   * Initializes settings from VS Code configuration and establishes theme listeners.
   *
   * @param webviewView - The WebView view to initialize
   * @throws Shows warning notification to user if critical initialization fails
   */
  public async resolveWebviewView(webviewView: vscode.WebviewView): Promise<void> {
    try {
      SettingsManager.loadBaseSettings();
      SettingsManager.loadAppSettings();
      webviewView.webview.options = {
        enableScripts: true,
        localResourceRoots: [this.extensionUri]
      };
      webviewView.webview.html = await this.getHtml(webviewView.webview, ELEMENTS);

      this.currentTheme = SettingsManager.getColorTheme();
      this.setupThemeListener(webviewView);
      this.setupStateManagement(webviewView);
      this.setupMessageHandler(webviewView);
      
      console.log('Initialized WebView successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Failed to resolve webview view:', message);
      vscode.window.showWarningMessage(
        'Failed to initialize the Customize VS Code Appearance sidebar. Some features may not work.',
        'Dismiss'
      );
    }
  }

  /**
   * Updates the sidebar with current workspace availability and adjusts configuration target.
   *
   * Automatically switches to Workspace scope when a workspace is open, and back to Global
   * when no workspace is available. Notifies the WebView of scope availability.
   *
   * @param webviewView - The WebView to update
   */
  private refreshWorkspaceAvailability(webviewView: vscode.WebviewView): void {
    const workspaceAvailable = !!vscode.workspace.workspaceFolders?.length || vscode.workspace.workspaceFile;
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

  private refreshAppSettings(webviewView: vscode.WebviewView): void {
    webviewView.webview.postMessage({
      type: 'appSettings',
      settings: {
        enableHoverHighlight: SettingsManager.getAppSettingValue('enableHoverHighlight')
      }
    });
  }

  /**
   * Listens for VS Code theme changes and refreshes colors when the theme or visibility changes.
   *
   * Re-computes all theme colors when:
   * - The active color theme changes (user selected a different theme)
   * - The WebView becomes visible again (may have missed theme changes while hidden)
   *
   * @param webviewView - The WebView to refresh with new theme colors
   * @see requestFreshThemeColors
   */
  private setupThemeListener(webviewView: vscode.WebviewView): void {
    this.requestFreshThemeColors(webviewView);

    webviewView.onDidChangeVisibility(async () => {
      if (webviewView.visible) {
        this.requestFreshThemeColors(webviewView);
        this.refreshAppSettings(webviewView);
      }
    });

    vscode.window.onDidChangeActiveColorTheme(async e => {
      const newTheme = await SettingsManager.getColorTheme();
      if (this.currentTheme !== newTheme) {
        console.log('Changed active color theme:', e.kind);
        this.currentTheme = newTheme;
        this.requestFreshThemeColors(webviewView);
      }
    });
  }

  /**
   * Requests the WebView to compute theme colors and update specific elements.
   *
   * Can update:
   * - All colors across all elements (default, used on theme change)
   * - Single element colors (used when resetting an element)
   * - Group colors (used when resetting a group)
   *
   * For colors with user customizations, uses those values. For colors without customization,
   * requests WebView to compute the theme color from VS Code CSS variables.
   *
   * @param webviewView - The WebView to send color computation request to
   * @param setting - Optional: specific element setting to update (for single element reset)
   * @param groupLabel - Optional: group label to update (for group reset)
   * @see setupThemeListener
   * @see themeColors
   */
  private requestFreshThemeColors(webviewView: vscode.WebviewView, setting?: ElementSetting, groupLabel?: string): void {
    const themeClass = vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Dark ? 'vscode-dark'
      : vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Light ? 'vscode-light'
      : 'vscode-high-contrast';
    
    const colorKeys: string[] = [];
    const colorsToUpdateFromBase: Record<string, string> = {};
    
    if (setting) {
      // Compute color for the single element being reset
      if (setting.type === 'color') {
        const baseSettingValue = SettingsManager.getSettingValue(setting.section, setting.key);
        if (baseSettingValue) {
          colorsToUpdateFromBase[setting.key] = baseSettingValue;
        } else {
          colorKeys.push(this.toThemeFormat(setting.key));
        }
      }
    } else if (groupLabel) {
      // Compute colors for the group being reset
      const group = ELEMENTS.find(el => el.label === groupLabel);
      if (group) {
        group.settings.forEach(s => {
          if (s.type === 'color') {
            const baseSettingValue = SettingsManager.getSettingValue(s.section, s.key);
            if (baseSettingValue) {
              colorsToUpdateFromBase[s.key] = baseSettingValue;
            } else {
              colorKeys.push(this.toThemeFormat(s.key));
            }
          }
        });
      }
    } else {
      // Compute all colors (for full scope resets and theme changes)
      ELEMENTS.forEach(el => {
        el.settings.forEach(s => {
          if (s.type === 'color') {
            const baseSettingValue = SettingsManager.getSettingValue(s.section, s.key);
            if (baseSettingValue) {
              colorsToUpdateFromBase[s.key] = baseSettingValue;
            } else {
              colorKeys.push(this.toThemeFormat(s.key));
            }
          }
        });
      });
    }

    if (Object.keys(colorsToUpdateFromBase).length > 0) {
      for (const key in colorsToUpdateFromBase) {
        const element = ELEMENTS.flatMap(g => g.settings).find(setting => setting.key  === this.toConfigFormat(key));
        if (element) {
          this.themeColors[key] = colorsToUpdateFromBase[key];
          this.refreshElementUI(webviewView, element);
        }
      }
    }

    if (colorKeys.length > 0) {
      webviewView.webview.postMessage({ 
        type: 'setTheme', 
        theme: themeClass,
        colorKeys: colorKeys
      });
    }
  }

  /**
   * Initializes state management for workspace availability detection.
   *
   * Detects whether a workspace is open and automatically switches the configuration
   * target (Global vs Workspace) accordingly. Updates the WebView with the current state.
   *
   * @param webviewView - The WebView to update with workspace availability state
   * @see refreshWorkspaceAvailability
   */
  private setupStateManagement(webviewView: vscode.WebviewView): void {
    this.refreshWorkspaceAvailability(webviewView);
  }

  /**
   * Sets up WebView message handler for extension ↔ WebView communication.
   *
   * Routes different message types (color changes, resets, scope switching, etc.)
   * to appropriate handlers in SettingsManager. Provides error handling with user notifications.
   *
   * @param webviewView - The WebView to handle messages from
   */
  private setupMessageHandler(webviewView: vscode.WebviewView): void {
    webviewView.webview.onDidReceiveMessage(async (msg) => {
      try {
        switch (msg.type) {
          case 'toggleHighlighting':
            try {
              await SettingsManager.setAppSetting('enableHoverHighlight', msg.enabled);
            } catch (err) {
              const message = err instanceof Error ? err.message : String(err);
              console.error('Failed to toggle highlighting:', message);
              vscode.window.showErrorMessage('Failed to save highlight preference');
            }
            break;
          case 'hover':
            await SettingsManager.onHover(msg.key);
            break;
          case 'leave':
            await SettingsManager.onLeave(msg.key);
            break;
          case 'setColor':
            try {
              await SettingsManager.onSetColor(msg.setting, msg.color);
            } catch (err) {
              const message = err instanceof Error ? err.message : String(err);
              console.error('Failed to set color:', message);
              vscode.window.showErrorMessage(`Failed to apply color: ${message}`);
            }
            break;
          case 'setNumber':
            try {
              await SettingsManager.onSetNumber(msg.setting, msg.value);
            } catch (err) {
              const message = err instanceof Error ? err.message : String(err);
              console.error('Failed to set number:', message);
              vscode.window.showErrorMessage(`Failed to apply setting: ${message}`);
            }
            break;
          case 'setString':
            try {
              await SettingsManager.onSetString(msg.setting, msg.value);
            } catch (err) {
              const message = err instanceof Error ? err.message : String(err);
              console.error('Failed to set string:', message);
              vscode.window.showErrorMessage(`Failed to apply setting: ${message}`);
            }
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
              try {
                SettingsManager.resetScope(msg.target);
                await SettingsManager.applyEffectiveColors();
                this.requestFreshThemeColors(webviewView);
                vscode.window.showInformationMessage(`${msg.target} settings reset to defaults`);
              } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                console.error('Failed to reset scope:', message);
                vscode.window.showErrorMessage(`Failed to reset settings: ${message}`);
              }
            });
            break;
          case 'resetGroup':
            this.withConfirmation(`Are you sure you want to reset ${msg.label} settings?`, async () => {
              try {
                SettingsManager.resetGroup(msg.label);
                await SettingsManager.applyEffectiveColors();
                this.requestFreshThemeColors(webviewView, undefined, msg.label);
                vscode.window.showInformationMessage(`${msg.label} settings reset to defaults`);
              } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                console.error('Failed to reset group:', message);
                vscode.window.showErrorMessage(`Failed to reset ${msg.label}: ${message}`);
              }
            });
            break;
          case 'resetElement':
            try {
              SettingsManager.resetElement(msg.setting);
              await SettingsManager.applyEffectiveColors();
              if (msg.setting.type === 'color') {
                this.requestFreshThemeColors(webviewView, msg.setting);
              } else {
                this.refreshElementUI(webviewView, msg.setting);
              }
            } catch (err) {
              const message = err instanceof Error ? err.message : String(err);
              console.error('Failed to reset element:', message);
              vscode.window.showErrorMessage(`Failed to reset setting: ${message}`);
            }
            break;
          case 'themeColorsReady':
            this.refreshUI(webviewView, msg.colors);
            break;
          case 'consoleLog':
            console.log(msg.message);
            break;
          case 'consoleError':
            console.error(msg.message);
            break;
          default:
            console.warn('Unknown message type:', msg.type);
        }
      } catch (err) {
        console.error('Failed to handle message:', err);
      }
    });
  }

  private async withConfirmation(message: string, action: () => Promise<void>, isModal: boolean = true): Promise<void> {
    const result = await vscode.window.showInformationMessage(message, { modal: isModal }, 'Yes');
    if (result === 'Yes') {
      await action();
    }
  }

  /**
   * Refreshes the sidebar UI with multiple new color values.
   *
   * Updates the display for a batch of color settings and updates internal color cache.
   * Wraps updates in a progress notification to inform the user of the refresh operation.
   *
   * @param webviewView - The WebView to refresh
   * @param newColors - Map of color key to hex color value to update
   * @see refreshElementUI
   */
  private refreshUI(webviewView: vscode.WebviewView, newColors: Record<string, string>): void {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: "Refreshing settings...",
      cancellable: true
    }, async (progress, token) => {
      token.onCancellationRequested(() => {
          console.warn("User cancelled the operation");
      });
      for (const key in newColors) {
        const element = ELEMENTS.flatMap(g => g.settings).find(setting => setting.key  === this.toConfigFormat(key));
        if (element) {
          this.themeColors[key] = newColors[key];
          this.refreshElementUI(webviewView, element);
        }
      }
    });
  }

  /**
   * Refreshes a single element's UI in the sidebar.
   *
   * Regenerates the HTML for a specific setting and sends it to the WebView to be displayed.
   * Used when a single element's value changes or needs to be reset.
   *
   * @param webviewView - The WebView to send the updated element HTML to
   * @param setting - The element setting that was changed
   * @see refreshUI
   * @see getInputHtml
   */
  private refreshElementUI(webviewView: vscode.WebviewView, setting: ElementSetting): void {
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
   * Validates and ensures the color value is a valid hex string.
   *
   * Accepts both 6-digit (#RRGGBB) and 8-digit (#RRGGBBAA) hex color formats.
   * Returns empty string for invalid or missing colors (no customization).
   *
   * @param value - The color string to validate
   * @returns Valid hex color string, or empty string if invalid/missing
   */
  private sanitizeHex(value?: string): string {
    if (!value) {
      return '';
    } // no customization defined
    // Accept both 6-digit (#RRGGBB) and 8-digit (#RRGGBBAA) hex colors
    return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value) ? value : '';
  }

  /**
   * Retrieves the cached theme color for a specific color key.
   *
   * Looks up the color in the internal theme color cache, converting key format
   * from config format (dot-separated) to theme format (dash-separated).
   *
   * @param colorKey - The color key in config format (e.g., "titleBar.activeBackground")
   * @returns The hex color value if cached, or undefined if not set
   * @see toThemeFormat
   */
  private getThemeColor(colorKey: string): string | undefined {
    const themeKey = this.toThemeFormat(colorKey);
    return this.themeColors[themeKey];
  }
  
  /**
   * Converts a key from theme format (dash-separated) to config format (dot-separated).
   *
   * Example: "titleBar-activeBackground" → "titleBar.activeBackground"
   *
   * @param key - The key in theme format (dash-separated)
   * @returns The key in config format (dot-separated)
   * @see toThemeFormat
   */
  private toConfigFormat(key: string): string {
    return key.replace(/-/g, '.');
  }
  
  /**
   * Converts a key from config format (dot-separated) to theme format (dash-separated).
   *
   * Example: "titleBar.activeBackground" → "titleBar-activeBackground"
   *
   * @param key - The key in config format (dot-separated)
   * @returns The key in theme format (dash-separated)
   * @see toConfigFormat
   */
  private toThemeFormat(key: string): string {
    return key.replace(/\./g, '-');
  }

  /**
   * Generates the complete HTML for the sidebar WebView.
   *
   * Combines template HTML with dynamically generated element sections, styles, and scripts.
   * Sets up the layout, theme styling, and initializes script loading.
   *
   * @param webview - The VS Code Webview API object
   * @param elements - Array of element definitions to render
   * @returns Complete HTML string for the sidebar
   * @see generateElementHtml
   * @see loadAndReplaceTemplate
   */
  private async getHtml(webview: vscode.Webview, elements: ElementDefinition[]): Promise<string> {
    const scriptUri = this.getScriptUri(webview);
    const styleSidebarUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'media', 'sidebar.css')
    );

    const itemsHtml = elements.map((el, idx) => this.generateElementHtml(el, idx)).join('\n');
    return this.loadAndReplaceTemplate(webview.cspSource, styleSidebarUri.toString(), itemsHtml, scriptUri.toString());
  }

  /**
   * Resolves the URI for the sidebar.js script in the WebView context.
   *
   * Converts the local file path to a WebView-compatible URI using asWebviewUri.
   *
   * @param webview - The VS Code Webview API object
   * @returns The WebView URI for sidebar.js
   * @see getHtml
   */
  private getScriptUri(webview: vscode.Webview): vscode.Uri {
    return webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionUri, 'out', 'webview', 'sidebar.js')
    );
  }

  /**
   * Generates HTML for an element group (category of settings).
   *
   * Creates a collapsible container with header, description, and all settings for the group.
   * Each setting is rendered using getInputHtml based on its type.
   *
   * @param el - The element definition containing group metadata and settings
   * @param idx - The index of this element in the overall elements array (for HTML data attributes)
   * @returns HTML string for the element group section
   * @see getInputHtml
   */
  private generateElementHtml(el: ElementDefinition, idx: number): string {
    const settingsHtml = el.settings.map(setting => `
      <div class="setting-container">
        <div class="setting-item" data-key="${setting.key}">
          <div class="setting-label" data-key="${setting.key}" title="${setting.description}">
            ${setting.label}
          </div>
          ${this.getInputHtml(setting)}
        </div>
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

  /**
   * Constructs the complete HTML document structure for the sidebar.
   *
   * Builds the HTML template with CSP headers, styles, script references, and embeds
   * the generated element sections and scope control buttons.
   *
   * @param cspSource - Content Security Policy source hash from VS Code
   * @param styleSidebarUri - URI to the sidebar CSS stylesheet
   * @param itemsHtml - Pre-generated HTML for all element sections
   * @param scriptUri - URI to the sidebar.js script file
   * @returns Complete HTML document string
   * @see getHtml
   */
  private loadAndReplaceTemplate(cspSource: string, styleSidebarUri: string, itemsHtml: string, scriptUri: string): string {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; style-src 'unsafe-inline' ${cspSource}; script-src ${cspSource};">
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
                <button id="btn-workspace" type="button" class="config-btn" aria-pressed="false">Workspace/Folder</button>
                <span class="scope-reset" data-target="Workspace" title="Reset customizations for elements listed below in the Workspace/Folder scope.">&#x21bb;</span>
              </div>
              <div class="scope-control">
                <input type="checkbox" id="enableHighlighting" class="checkbox-input" ${SettingsManager.getAppSettingValue('enableHoverHighlight') ? 'checked' : ''} />
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

  /**
   * Generates the appropriate input HTML for a setting based on its type.
   *
   * Routes to specialized methods for color inputs (color picker), number inputs,
   * select inputs (dropdown), or text inputs based on the setting's type and configuration.
   *
   * @param setting - The element setting definition
   * @returns HTML string for the input control
   * @see getColorInput
   * @see getNumberInput
   * @see getSelectInput
   * @see getTextInput
   */
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

  /**
   * Generates HTML for a color input control (color picker with opacity slider).
   *
   * Creates a color picker input with an optional alpha (opacity) slider.
   * Uses the current custom color if set, otherwise uses the VS Code theme color.
   * Supports both 6-digit (#RRGGBB) and 8-digit (#RRGGBBAA) hex color formats.
   *
   * @param setting - The color setting definition
   * @returns HTML string for the color picker control
   * @see getInputHtml
   */
  private getColorInput(setting: ElementSetting): string {
    const color = this.sanitizeHex(SettingsManager.getSettingValue(setting.section, setting.key));
    // Use theme color as default if no custom color is set
    const themeColor = this.getThemeColor(setting.key);
    const defaultColor = themeColor || '#000000';

    // Extract RGB (6 chars) and alpha (2 chars) from the color value
    let rgbColor = defaultColor; // default RGB
    let alphaPercent = '100'; // default opacity
    
    if (color) {
      if (color.length === 9) {
        // 8-digit hex: #RRGGBBAA
        rgbColor = color.substring(0, 7);
        const alphaHex = color.substring(7, 9);
        alphaPercent = String(Math.round((parseInt(alphaHex, 16) / 255) * 100));
      } 
      if (color.length === 7) {
        // 6-digit hex: #RRGGBB
        rgbColor = color;
      }
    } else if (themeColor && themeColor.length >= 7) {
      if (themeColor.length === 9) {
        rgbColor = themeColor.substring(0, 7);
        const alphaHex = themeColor.substring(7, 9);
        alphaPercent = String(Math.round((parseInt(alphaHex, 16) / 255) * 100));
      } 
      if (themeColor.length === 7) {
        rgbColor = themeColor;
      }
    }
    
    return `
      <div id="${setting.section}.${setting.key}" class="element-row" data-is-modified="${!!color}" data-setting="${encodeURIComponent(JSON.stringify(setting))}">
        <div class="color-input-group">
          <input type="color" class="picker color-rgb input-style" title="${!color ? "Using theme color. Click to customize." : rgbColor}" value="${rgbColor}" />
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

  /**
   * Generates HTML for a numeric input control with up/down buttons.
   *
   * Creates a number input field with increment/decrement buttons for settings
   * like font size or line height. Displays the current value or default if not set.
   * Supports numeric range from 6 to 100 with step of 1.
   *
   * @param setting - The number setting definition
   * @returns HTML string for the number input control
   * @see getInputHtml
   */
  private getNumberInput(setting: ElementSetting): string {
    const currentValue = SettingsManager.getSettingValue(setting.section, setting.key);
    const value: number = currentValue ? parseInt(currentValue) || 0 : 0;
    return `
      <div id="${setting.section}.${setting.key}" class="element-row" data-is-modified="${!!currentValue && currentValue !== setting.defaultValue}" data-setting="${encodeURIComponent(JSON.stringify(setting))}">
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

  /**
   * Generates HTML for a select dropdown control (for predefined options).
   *
   * Creates a dropdown menu with options defined in the setting.
   * Uses the current custom value if set, otherwise uses the default option.
   * Options are capitalized in the dropdown display.
   *
   * @param setting - The string setting definition with options array
   * @returns HTML string for the select dropdown control
   * @see getInputHtml
   */
  private getSelectInput(setting: ElementSetting): string {
    const value = SettingsManager.getSettingValue(setting.section, setting.key) || setting.defaultValue || '';
    const options = (setting.options || []).map(opt =>
      `<option value="${opt}" ${opt === value || opt === setting.defaultValue ? 'selected' : ''}>
        ${opt.charAt(0).toUpperCase() + opt.slice(1)}
      </option>`
    ).join('');
    return `
      <div id="${setting.section}.${setting.key}" class="element-row" data-is-modified="${!!value && value !== setting.defaultValue}" data-setting="${encodeURIComponent(JSON.stringify(setting))}">
        <select class="select-input input-style">
          <option selected value="" disabled>
          </option>${options}
        </select>
        <span class="reset-element" title="Reset">&#x21bb;</span>
      </div>`;
  }

  /**
   * Generates HTML for a text input control (for free-form string values).
   *
   * Creates a text input field for settings that accept any string value.
   * Displays the current custom value if set, otherwise uses the default value.
   * Used for settings like font family or custom CSS values.
   *
   * @param setting - The string setting definition without options
   * @returns HTML string for the text input control
   * @see getInputHtml
   */
  private getTextInput(setting: ElementSetting): string {
    const value = SettingsManager.getSettingValue(setting.section, setting.key) || setting.defaultValue || '';
    return `
      <div id="${setting.section}.${setting.key}" class="element-row" data-is-modified="${!!value && value !== setting.defaultValue}" data-setting="${encodeURIComponent(JSON.stringify(setting))}">
        <input
          type="text"
          class="string-input input-style"
          value="${value}" />
        <span class="reset-element" title="Reset">&#x21bb;</span>
      </div>`;
  }
}
