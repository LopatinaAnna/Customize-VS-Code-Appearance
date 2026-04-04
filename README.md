# VS Code Appearance Customizer

A VS Code extension that provides an intuitive sidebar interface for customizing VS Code's appearance. Customize colors for UI elements, editor settings, and layout preferences with live preview.

**Preview version. Development is in progress.**

## 🌟 Key Features

- **Visual Color Picker**: Change colors for title bar, activity bar, editor, status bar, and more directly from a user-friendly sidebar
- **Live Preview**: See color changes instantly as you adjust them with automatic preview highlighting
- **Dual-Target Configuration**: Apply customizations to either Global (all workspaces) or Workspace (current folder) scope
- **Per-Element Reset**: Reset individual UI element colors without affecting other customizations
- **Per-Scope Reset**: Clear all customizations for the selected scope (Global or Workspace)
- **Theme-Aware UI**: The sidebar adapts to VS Code's current theme (light, dark, or high-contrast) for seamless integration
- **Extended Customizations**:
  - Editor font size
  - Activity bar, sidebar, and panel positioning
  - 100+ color customizations for UI elements and editor features
- **🌐 Multi-Platform Support**: Works in VS Code Desktop, Web and Codespaces

## 🎨 Supported Elements

The extension provides customization for over 100+ color settings and UI elements across multiple categories:

### UI Elements

- **Title Bar** - Background & foreground (active/inactive), border
- **Activity Bar** - Background, foreground, badges, borders, position, drop indicators
  - Includes top position variants
  - Badge colors (normal, warning, error)
  - Location setting (side/top/bottom/hidden)
- **Side Bar** - Background, foreground, borders, dropzone, titles, sections, sticky scroll
- **Editor** - Background, foreground, cursors, selection, highlights, line numbers, brackets, links
  - Multi-cursor support colors
  - Find and search match colors
  - Word highlight colors (read/write access)
  - Bracket pair coloring (6 levels)
  - Unicode highlight colors
- **Status Bar** - Background, foreground, borders, debugging, notification colors
- **Sidebar** - Component and focus colors
- **Terminal** - Tab colors and styling
- **Notifications** - Center and toast notification colors
- **Input/Select Controls** - Background, foreground, borders, placeholders
- **Scrollbar** - Styling and hover effects
- **Minimap** - Colors and styling
- **Badges** - Background and foreground colors

### Editor Settings

- **Font Size** - Pixel-based sizing

### Layout Settings

- **Activity Bar Position** - Side (default), top, bottom, or hidden
- **Sidebar Position** - Left or right
- **Panel Position** - Bottom or right

## 🌐 Platform Support

This extension works seamlessly across all VS Code environments:

- ✅ **VS Code Desktop** (Windows, macOS, Linux)
- ✅ **VS Code Web** (https://vscode.dev)
- ✅ **GitHub Codespaces**
- ✅ **Untrusted Workspaces** (supported - no filesystem access required)

The extension is fully web-compatible and requires no filesystem access, making it safe for untrusted workspaces.

## 📖 Usage

1. Open the **Customize Appearance** sidebar from the activity bar
2. Select your configuration target:
   - **Global**: Changes apply to all workspaces
   - **Workspace**: Changes apply only to the current workspace or folder (if one is open)
3. Browse UI element categories and adjust colors using the color picker, input font size or select positioning
4. Hover over elements to preview changes
5. Click the **⟳** icon next to an element to reset it to defaults
5. Click the **⟳** icon next to a group to reset its related elments to defaults
6. Click the **⟳** icon next to a scope to reset all settings in that scope

### Tips for Best Results

- **Live Preview**: Hover over element to highlight it
- **Scope Combination**: Use Global settings for default preferences across all workspaces, then override with Workspace settings
- **Search Settings**: Search for color names in VS Code Settings (Ctrl+,) to find related settings
- **Export Customizations**: Share your customizations by copying `.vscode/settings.json` (workspace) or settings.json (global)
- **Undo Changes**: Use the reset buttons to quickly revert individual colors or entire scopes
- **Theme Switching**: The sidebar automatically adapts when you change VS Code themes

## ⚙️ Configuration

This extension modifies the following VS Code settings:

### Color Customizations
- `workbench.colorCustomizations`: All color settings (100+ options across UI elements and editor)

### Editor Settings  
- `editor.fontSize`: Editor font size in pixels

### Layout Settings
- `workbench.activityBar.location`: Activity bar position (side/top/bottom/hidden)
- `workbench.sideBar.location`: Sidebar position (left/right)
- `workbench.panel.defaultLocation`: Panel position (bottom/right)

All changes are made through VS Code's native settings system and can be manually edited in `settings.json` or `.vscode/settings.json`.

## 🎯 Workspace vs Global Scope

The extension supports two configuration scopes:

### Global Settings
- Stored in: `~/.config/Code/user/settings.json` (Linux), `~/Library/Application Support/Code/User/settings.json` (macOS), or `%APPDATA%\Code\User\settings.json` (Windows)
- Apply to: All VS Code workspaces and windows
- Use for: Default preferences across your entire VS Code installation

### Workspace Settings
- Stored in: `.vscode/settings.json` in the workspace root
- Apply to: Current workspace/folder only
- Use for: Project-specific customizations
- Override: Workspace settings override Global settings for the same keys
- Available when: A folder or workspace is open

**Note**: Global button is disabled when no workspace is open to prevent confusion.

## 🔄 Reset Functionality

The extension provides granular control over reverting changes:

- **Element Reset**: Click the **⟳** icon next to any UI element to reset its specific settings to defaults
- **Group Reset**: Click the **⟳** icon next to a group (like "Title Bar" or "Editor") to reset all colors in that category
- **Scope Reset**: Click the **⟳** icon next to Global or Workspace to reset ALL colors in that entire scope
- **Confirmation**: Resets ask for confirmation before permanent removal

## 📦 Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Customize VS Code Appearance"
4. Click Install

### For VS Code Web (vscode.dev)
1. Go to https://vscode.dev
2. Open Extensions (Ctrl+Shift+X)
3. Search for "Customize VS Code Appearance"
4. Click Install

## Requirements

- **VS Code**: 1.104.0 or later
- **No additional dependencies required** - works with vanilla VS Code

## 🔐 Security & Permissions

- **No filesystem access**: The extension only modifies VS Code settings via the native API
- **Safe for untrusted workspaces**: Can be enabled in untrusted workspace mode
- **Safe for virtual workspaces**: Fully compatible with remote and virtual scenarios
- **No external dependencies**: Uses only VS Code built-in APIs

## 🚀 Performance

- **No impact on VS Code startup time** - loaded only when sidebar is opened
- **Minimal memory footprint** - uses native VS Code APIs
- **Instant updates** - color changes apply immediately without reload

## 📋 Architecture

The extension is built with:
- **TypeScript** - Type-safe language
- **VS Code Webview API** - For sidebar UI
- **VS Code Configuration API** - For settings management
- **Vanilla JavaScript** - No heavy frameworks in webview

**Architecture**: Sidebar webview ↔ Extension host ↔ VS Code settings system

## 🔄 Release Notes

See [CHANGELOG.md] for full version history
