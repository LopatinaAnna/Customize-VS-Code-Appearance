import * as vscode from "vscode";

const HIGHLIGHT_COLOR = "#9a9a9aff";
const CONFIG_KEY = "workbench.colorCustomizations";

type ColorsMap = Record<string, string | undefined>;

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "styleCustomizerView",
      new StyleCustomizerProvider(context)
    )
  );
}

export function deactivate() { }

class StyleCustomizerProvider implements vscode.WebviewViewProvider {
  private baseColors: ColorsMap = {};
  private tempHighlights: Record<string, string> = {};

  private pendingWrite: NodeJS.Timeout | null = null;
  private lastWritePromise: Promise<void> = Promise.resolve();

  private elements = [
    { label: "Title Bar", key: "titleBar.activeBackground" },
    { label: "Activity Bar", key: "activityBar.background" },
    { label: "Side Bar", key: "sideBar.background" },
    { label: "Command Center", key: "commandCenter.background" },
  ];

  constructor(private readonly context: vscode.ExtensionContext) { }

  public async resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = { enableScripts: true };
    await this.loadBaseColors();

    webviewView.webview.html = this.getHtml();

    webviewView.webview.onDidReceiveMessage(async (msg) => {
      try {
        switch (msg.type) {
          case "hover":
            await this.onHover(msg.key);
            break;
          case "leave":
            await this.onLeave(msg.key);
            break;
          case "setColor":
            await this.onSetColor(msg.key, msg.color);
            break;
        }
      } catch (err) {
        console.error("Error handling message:", err);
      }
    });
  }

  private async loadBaseColors(): Promise<void> {
    const cfg = vscode.workspace.getConfiguration();
    const current = cfg.get<Record<string, string>>(CONFIG_KEY) || {};
    this.baseColors = { ...current };
  }

  private async onHover(key: string) {
    if (this.tempHighlights[key]) return;
    this.tempHighlights[key] = HIGHLIGHT_COLOR;
    await this.applyEffectiveColors();
  }

  private async onLeave(key: string) {
    if (!this.tempHighlights[key]) return;
    delete this.tempHighlights[key];
    await this.applyEffectiveColors();
  }

  private async onSetColor(key: string, color: string) {
    if (!color || color.trim() === "") {
      delete this.baseColors[key];
    } else {
      this.baseColors[key] = color.trim();
    }
    await this.applyEffectiveColors();
  }

  private async applyEffectiveColors(): Promise<void> {
    if (this.pendingWrite) {
      clearTimeout(this.pendingWrite);
    }

    this.pendingWrite = setTimeout(() => {
      this.pendingWrite = null;

      const config = vscode.workspace.getConfiguration();
      const currentSettings = config.get<Record<string, string>>(CONFIG_KEY) || {};

      const effective: Record<string, string | undefined> = { ...currentSettings };

      // persistent
      for (const k of Object.keys(this.baseColors)) {
        const v = this.baseColors[k];
        if (v === undefined) delete effective[k];
        else effective[k] = v;
      }

      // temporary highlights
      for (const k of Object.keys(this.tempHighlights)) {
        effective[k] = this.tempHighlights[k];
      }

      const cleaned: Record<string, string> = {};
      Object.entries(effective).forEach(([k, v]) => {
        if (v !== undefined) cleaned[k] = v;
      });

      this.lastWritePromise = this.lastWritePromise
        .then(() => {
          console.log("Update config");
          config.update(CONFIG_KEY, cleaned, vscode.ConfigurationTarget.Global)
        })
        .catch((err) => console.error("Failed to update:", err));
    }, 10);
  }

  private sanitizeHex(value: string | undefined): string {
    if (!value) return "#000000";
    const match = /^#([0-9a-fA-F]{6})$/.exec(value);
    return match ? value : "#000000";
  }

  private getHtml(): string {
    const itemsHtml = this.elements
      .map((el) => {
        const color = this.sanitizeHex(this.baseColors[el.key]);
        return `
        <div class="item" data-key="${el.key}">
          <span>${el.label}</span>
          <input type="color" class="picker" data-key="${el.key}" value="${color}" />
        </div>`;
      })
      .join("\n");

    return /*html*/ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline';" />
  <style>
    body { font-family: sans-serif; color: #ddd; background: #1e1e1e; padding: 10px; }
    h3 { margin: 0 0 10px 0; color: #fff; font-size: 13px; }
    .item { display: flex; align-items: center; justify-content: space-between; padding: 6px; margin: 4px 8px; border-radius: 6px; background: #2a2a2a; cursor: pointer; }
    .item:hover { background: #3b3b3b; }
    .picker { margin-left: 8px; }
  </style>
</head>
<body>
  ${itemsHtml}
  <script>
    const vscode = acquireVsCodeApi();

    document.querySelectorAll('.item').forEach(el => {
      const key = el.getAttribute('data-key');
      el.addEventListener('mouseenter', () => vscode.postMessage({ type: 'hover', key }));
      el.addEventListener('mouseleave', () => vscode.postMessage({ type: 'leave', key }));
    });

    document.querySelectorAll('.picker').forEach(input => {
      const key = input.getAttribute('data-key');
      input.addEventListener('input', () => {
        vscode.postMessage({ type: 'setColor', key, color: input.value });
      });
    });
  </script>
</body>
</html>`;
  }
}
