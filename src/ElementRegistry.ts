import { ElementDefinition } from "./interfaces/ElementDefinition";

export const ELEMENTS: ElementDefinition[] = [
  {
    label: 'Title Bar',
    description: 'The title bar is displayed at the top of the window and shows the name of the current file or application.',
    settings: [
      { label: 'Active Background', section: 'workbench.colorCustomizations', key: 'titleBar.activeBackground', type: 'color', description: 'The background color of the title bar when the window is active. This color is only used on Windows and Linux.' },
      { label: 'Active Foreground', section: 'workbench.colorCustomizations', key: 'titleBar.activeForeground', type: 'color', description: 'The foreground color of the title bar when the window is active.' },
      { label: 'Inactive Background', section: 'workbench.colorCustomizations', key: 'titleBar.inactiveBackground', type: 'color', description: 'The background color of the title bar when the window is inactive.' },
      { label: 'Inactive Foreground', section: 'workbench.colorCustomizations', key: 'titleBar.inactiveForeground', type: 'color', description: 'The foreground color of the title bar when the window is inactive.' },
      { label: 'Border', section: 'workbench.colorCustomizations', key: 'titleBar.border', type: 'color', description: 'The border color of the title bar.' },
    ],
  },
  {
    label: 'Activity Bar',
    description: 'The Activity Bar is usually displayed either on the far left or right of the workbench and allows fast switching between views of the Side Bar.',
    settings: [
      { label: 'Background', section: 'workbench.colorCustomizations', key: 'activityBar.background', type: 'color', description: 'The background color of the activity bar.' },
      { label: 'Drop Border', section: 'workbench.colorCustomizations', key: 'activityBar.dropBorder', type: 'color', description: 'The border color of the activity bar when a drag operation is in progress.' },
      { label: 'Foreground', section: 'workbench.colorCustomizations', key: 'activityBar.foreground', type: 'color', description: 'The foreground color of the activity bar.' },
      { label: 'Inactive Foreground', section: 'workbench.colorCustomizations', key: 'activityBar.inactiveForeground', type: 'color', description: 'The foreground color of the activity bar when it is inactive.' },
      { label: 'Border', section: 'workbench.colorCustomizations', key: 'activityBar.border', type: 'color', description: 'The border color of the activity bar.' },
      { label: 'Badge Background', section: 'workbench.colorCustomizations', key: 'activityBarBadge.background', type: 'color', description: 'The background color of the activity bar badge.' },
      { label: 'Badge Foreground', section: 'workbench.colorCustomizations', key: 'activityBarBadge.foreground', type: 'color', description: 'The foreground color of the activity bar badge.' },
      { label: 'Active Border', section: 'workbench.colorCustomizations', key: 'activityBar.activeBorder', type: 'color', description: 'The border color of the active activity bar item.' },
      { label: 'Active Background', section: 'workbench.colorCustomizations', key: 'activityBar.activeBackground', type: 'color', description: 'The background color of the active activity bar item.' },
      { label: 'Active Focus Border', section: 'workbench.colorCustomizations', key: 'activityBar.activeFocusBorder', type: 'color', description: 'The focus border color of the active activity bar item.' },
      { label: 'Top Foreground', section: 'workbench.colorCustomizations', key: 'activityBarTop.foreground', type: 'color', description: 'The foreground color of the activity bar when it is positioned at the top.' },
      { label: 'Top Background', section: 'workbench.colorCustomizations', key: 'activityBarTop.background', type: 'color', description: 'The background color of the activity bar when it is positioned at the top.' },
      { label: 'Top Active Background', section: 'workbench.colorCustomizations', key: 'activityBarTop.activeBackground', type: 'color', description: 'The background color of the active activity bar item when the activity bar is positioned at the top.' },
      { label: 'Top Active Border', section: 'workbench.colorCustomizations', key: 'activityBarTop.activeBorder', type: 'color', description: 'The border color of the active activity bar item when the activity bar is positioned at the top.' },
      { label: 'Top Inactive Foreground', section: 'workbench.colorCustomizations', key: 'activityBarTop.inactiveForeground', type: 'color', description: 'The foreground color of the activity bar when it is positioned at the top and inactive.' },
      { label: 'Top Drop Border', section: 'workbench.colorCustomizations', key: 'activityBarTop.dropBorder', type: 'color', description: 'The border color of the activity bar when it is positioned at the top and a drag operation is in progress.' },
      { label: 'Warning Badge Background', section: 'workbench.colorCustomizations', key: 'activityWarningBadge.background', type: 'color', description: 'The background color of the activity bar warning badge.' },
      { label: 'Warning Badge Foreground', section: 'workbench.colorCustomizations', key: 'activityWarningBadge.foreground', type: 'color', description: 'The foreground color of the activity bar warning badge.' },
      { label: 'Error Badge Background', section: 'workbench.colorCustomizations', key: 'activityErrorBadge.background', type: 'color', description: 'The background color of the activity bar error badge.' },
      { label: 'Error Badge Foreground', section: 'workbench.colorCustomizations', key: 'activityErrorBadge.foreground', type: 'color', description: 'The foreground color of the activity bar error badge.' },
      { label: 'Position', section: 'workbench.activityBar', key: 'location', type: 'string', options: ['default', 'top', 'bottom', 'hidden'], description: 'The location of the activity bar. "default" means left in LTR and right in RTL. When positioned at the top or bottom, it takes sidebar colors unless "Top ..." setting customized.' },
    ],
  },
  {
    label: 'Side Bar',
    description: 'The Side Bar contains views like the Explorer and Search.',
    settings: [
      { label: 'Background', section: 'workbench.colorCustomizations', key: 'sideBar.background', type: 'color', description: 'The background color of the side bar.' },
      { label: 'Foreground', section: 'workbench.colorCustomizations', key: 'sideBar.foreground', type: 'color', description: 'The foreground color of the side bar.' },
      { label: 'Border', section: 'workbench.colorCustomizations', key: 'sideBar.border', type: 'color', description: 'The border color of the side bar.' },
      { label: 'Drop Background', section: 'workbench.colorCustomizations', key: 'sideBar.dropBackground', type: 'color', description: 'The background color of the side bar when an item is dragged over it.' },
      { label: 'Title Foreground', section: 'workbench.colorCustomizations', key: 'sideBarTitle.foreground', type: 'color', description: 'The foreground color of the side bar title.' },
      { label: 'Title Background', section: 'workbench.colorCustomizations', key: 'sideBarTitle.background', type: 'color', description: 'The background color of the side bar title.' },
      { label: 'Title Border', section: 'workbench.colorCustomizations', key: 'sideBarTitle.border', type: 'color', description: 'The border color of the side bar title.' },
      { label: 'Section Header Background', section: 'workbench.colorCustomizations', key: 'sideBarSectionHeader.background', type: 'color', description: 'The background color of the side bar section header.' },
      { label: 'Section Header Foreground', section: 'workbench.colorCustomizations', key: 'sideBarSectionHeader.foreground', type: 'color', description: 'The foreground color of the side bar section header.' },
      { label: 'Section Header Border', section: 'workbench.colorCustomizations', key: 'sideBarSectionHeader.border', type: 'color', description: 'The border color of the side bar section header.' },
      { label: 'Activity Bar Top border', section: 'workbench.colorCustomizations', key: 'sideBarActivityBarTop.border', type: 'color', description: 'The border color of the side bar when the activity bar is positioned at the top.' },
      { label: 'Sticky Scroll Background', section: 'workbench.colorCustomizations', key: 'sideBarStickyScroll.background', type: 'color', description: 'The background color of the side bar sticky scroll.' },
      { label: 'Sticky Scroll Border', section: 'workbench.colorCustomizations', key: 'sideBarStickyScroll.border', type: 'color', description: 'The border color of the side bar sticky scroll.' },
      { label: 'Sticky Scroll Shadow', section: 'workbench.colorCustomizations', key: 'sideBarStickyScroll.shadow', type: 'color', description: 'The shadow color of the side bar sticky scroll.' },
      { label: 'Position', section: 'workbench.sideBar', key: 'location', type: 'string', options: ['left', 'right'], description: 'The position of the side bar.' },
    ],
  },
  {
    label: 'Editor',
    description: 'The editor is the main area where you can view and edit your files.',
    settings: [
      { label: 'Background', section: 'workbench.colorCustomizations', key: 'editor.background', type: 'color', description: 'Editor background color.' },
      { label: 'Foreground', section: 'workbench.colorCustomizations', key: 'editor.foreground', type: 'color', description: 'Editor default foreground color.' },

      { label: 'Font Size', section: 'editor', key: 'fontSize', type: 'number', description: 'Controls the font size in pixels.' },

      { label: 'Line Number Foreground', section: 'workbench.colorCustomizations', key: 'editorLineNumber.foreground', type: 'color', description: 'Color of editor line numbers.' },
      { label: 'Active Line Number', section: 'workbench.colorCustomizations', key: 'editorLineNumber.activeForeground', type: 'color', description: 'Color of the active editor line number.' },
      { label: 'Dimmed Line Number', section: 'workbench.colorCustomizations', key: 'editorLineNumber.dimmedForeground', type: 'color', description: 'Color of the final editor line when editor.renderFinalNewline is set to dimmed.' },

      { label: 'Cursor Background', section: 'workbench.colorCustomizations', key: 'editorCursor.background', type: 'color', description: 'The background color of the editor cursor. Allows customizing overlapped character color.' },
      { label: 'Cursor Foreground', section: 'workbench.colorCustomizations', key: 'editorCursor.foreground', type: 'color', description: 'Color of the editor cursor.' },

      { label: 'Primary Cursor Foreground', section: 'workbench.colorCustomizations', key: 'editorMultiCursor.primary.foreground', type: 'color', description: 'Color of the primary editor cursor when multiple cursors are present.' },
      { label: 'Primary Cursor Background', section: 'workbench.colorCustomizations', key: 'editorMultiCursor.primary.background', type: 'color', description: 'Background color of the primary editor cursor when multiple cursors are present.' },
      { label: 'Secondary Cursor Foreground', section: 'workbench.colorCustomizations', key: 'editorMultiCursor.secondary.foreground', type: 'color', description: 'Color of secondary editor cursors.' },
      { label: 'Secondary Cursor Background', section: 'workbench.colorCustomizations', key: 'editorMultiCursor.secondary.background', type: 'color', description: 'Background color of secondary editor cursors.' },

      { label: 'Placeholder Foreground', section: 'workbench.colorCustomizations', key: 'editor.placeholder.foreground', type: 'color', description: 'Foreground color of placeholder text in the editor.' },
      { label: 'Composition Border', section: 'workbench.colorCustomizations', key: 'editor.compositionBorder', type: 'color', description: 'Border color for an IME composition.' },

      { label: 'Selection Background', section: 'workbench.colorCustomizations', key: 'editor.selectionBackground', type: 'color', description: 'Color of the editor selection.' },
      { label: 'Selection Foreground', section: 'workbench.colorCustomizations', key: 'editor.selectionForeground', type: 'color', description: 'Color of selected text for high contrast.' },
      { label: 'Inactive Selection Background', section: 'workbench.colorCustomizations', key: 'editor.inactiveSelectionBackground', type: 'color', description: 'Color of selection in an inactive editor. This color must be transparent or it will obscure content.' },

      { label: 'Selection Highlight Background', section: 'workbench.colorCustomizations', key: 'editor.selectionHighlightBackground', type: 'color', description: 'Color for regions matching selection. This color must be transparent or it will obscure content.' },
      { label: 'Selection Highlight Border', section: 'workbench.colorCustomizations', key: 'editor.selectionHighlightBorder', type: 'color', description: 'Border color for regions matching selection.' },

      { label: 'Word Highlight Background', section: 'workbench.colorCustomizations', key: 'editor.wordHighlightBackground', type: 'color', description: 'Background color during read-access. This color must be transparent or it will obscure content.' },
      { label: 'Word Highlight Border', section: 'workbench.colorCustomizations', key: 'editor.wordHighlightBorder', type: 'color', description: 'Border color during read-access.' },
      { label: 'Word Highlight Strong Background', section: 'workbench.colorCustomizations', key: 'editor.wordHighlightStrongBackground', type: 'color', description: 'Background color during write-access. This color must be transparent or it will obscure content.' },
      { label: 'Word Highlight Strong Border', section: 'workbench.colorCustomizations', key: 'editor.wordHighlightStrongBorder', type: 'color', description: 'Border color during write-access.' },
      { label: 'Word Highlight Text Background', section: 'workbench.colorCustomizations', key: 'editor.wordHighlightTextBackground', type: 'color', description: 'Background color of textual occurrences. This color must be transparent or it will obscure content.' },
      { label: 'Word Highlight Text Border', section: 'workbench.colorCustomizations', key: 'editor.wordHighlightTextBorder', type: 'color', description: 'Border color of textual occurrences.' },

      { label: 'Find Match Background', section: 'workbench.colorCustomizations', key: 'editor.findMatchBackground', type: 'color', description: 'Color of the current search match.' },
      { label: 'Find Match Foreground', section: 'workbench.colorCustomizations', key: 'editor.findMatchForeground', type: 'color', description: 'Text color of the current search match.' },
      { label: 'Find Match Highlight Foreground', section: 'workbench.colorCustomizations', key: 'editor.findMatchHighlightForeground', type: 'color', description: 'Foreground of other search matches. This color must be transparent or it will obscure content.' },
      { label: 'Find Match Highlight Background', section: 'workbench.colorCustomizations', key: 'editor.findMatchHighlightBackground', type: 'color', description: 'Background of other search matches. This color must be transparent or it will obscure content.' },
      { label: 'Find Range Highlight Background', section: 'workbench.colorCustomizations', key: 'editor.findRangeHighlightBackground', type: 'color', description: 'Color of range limiting search. This color must be transparent or it will obscure content.' },

      { label: 'Find Match Border', section: 'workbench.colorCustomizations', key: 'editor.findMatchBorder', type: 'color', description: 'Border color of current search match.' },
      { label: 'Find Match Highlight Border', section: 'workbench.colorCustomizations', key: 'editor.findMatchHighlightBorder', type: 'color', description: 'Border color of other search matches. This color must be transparent or it will obscure content.' },
      { label: 'Find Range Highlight Border', section: 'workbench.colorCustomizations', key: 'editor.findRangeHighlightBorder', type: 'color', description: 'Border of range limiting search. This color must be transparent or it will obscure content.' },

      { label: 'Search Results Info Foreground', section: 'workbench.colorCustomizations', key: 'search.resultsInfoForeground', type: 'color', description: 'Color of search results info text.' },

      { label: 'Search Editor Match Background', section: 'workbench.colorCustomizations', key: 'searchEditor.findMatchBackground', type: 'color', description: 'Color of search editor results.' },
      { label: 'Search Editor Match Border', section: 'workbench.colorCustomizations', key: 'searchEditor.findMatchBorder', type: 'color', description: 'Border color of search editor results.' },
      { label: 'Search Editor Input Border', section: 'workbench.colorCustomizations', key: 'searchEditor.textInputBorder', type: 'color', description: 'Search editor input border.' },

      { label: 'Hover Highlight Background', section: 'workbench.colorCustomizations', key: 'editor.hoverHighlightBackground', type: 'color', description: 'Highlight under hovered word. This color must be transparent or it will obscure content.' },

      { label: 'Line Highlight Background', section: 'workbench.colorCustomizations', key: 'editor.lineHighlightBackground', type: 'color', description: 'Highlight of current line.' },
      { label: 'Inactive Line Highlight Background', section: 'workbench.colorCustomizations', key: 'editor.inactiveLineHighlightBackground', type: 'color', description: 'Highlight of current line when inactive.' },
      { label: 'Line Highlight Border', section: 'workbench.colorCustomizations', key: 'editor.lineHighlightBorder', type: 'color', description: 'Border around current line.' },

      { label: 'Unicode Highlight Border', section: 'workbench.colorCustomizations', key: 'editorUnicodeHighlight.border', type: 'color', description: 'Border for unicode highlight.' },
      { label: 'Unicode Highlight Background', section: 'workbench.colorCustomizations', key: 'editorUnicodeHighlight.background', type: 'color', description: 'Background for unicode highlight.' },

      { label: 'Active Link Foreground', section: 'workbench.colorCustomizations', key: 'editorLink.activeForeground', type: 'color', description: 'Color of active links.' },

      { label: 'Range Highlight Background', section: 'workbench.colorCustomizations', key: 'editor.rangeHighlightBackground', type: 'color', description: 'Background of highlighted ranges. This color must be transparent or it will obscure content.' },
      { label: 'Range Highlight Border', section: 'workbench.colorCustomizations', key: 'editor.rangeHighlightBorder', type: 'color', description: 'Border of highlighted ranges.' },

      { label: 'Symbol Highlight Background', section: 'workbench.colorCustomizations', key: 'editor.symbolHighlightBackground', type: 'color', description: 'Background of highlighted symbol. This color must be transparent or it will obscure content.' },
      { label: 'Symbol Highlight Border', section: 'workbench.colorCustomizations', key: 'editor.symbolHighlightBorder', type: 'color', description: 'Border of highlighted symbols.' },

      { label: 'Whitespace Foreground', section: 'workbench.colorCustomizations', key: 'editorWhitespace.foreground', type: 'color', description: 'Color of whitespace characters.' },

      { label: 'Lightbulb Foreground', section: 'workbench.colorCustomizations', key: 'editorLightBulb.foreground', type: 'color', description: 'Lightbulb actions icon color.' },
      { label: 'Lightbulb AutoFix', section: 'workbench.colorCustomizations', key: 'editorLightBulbAutoFix.foreground', type: 'color', description: 'Auto fix lightbulb icon color.' },
      { label: 'Lightbulb AI', section: 'workbench.colorCustomizations', key: 'editorLightBulbAi.foreground', type: 'color', description: 'AI lightbulb icon color.' },

      { label: 'Bracket Match Background', section: 'workbench.colorCustomizations', key: 'editorBracketMatch.background', type: 'color', description: 'Background behind matching brackets.' },
      { label: 'Bracket Match Border', section: 'workbench.colorCustomizations', key: 'editorBracketMatch.border', type: 'color', description: 'Border for matching brackets.' },
      { label: 'Bracket Match Foreground', section: 'workbench.colorCustomizations', key: 'editorBracketMatch.foreground', type: 'color', description: 'Foreground for matching brackets.' },

      { label: 'Bracket Highlight 1', section: 'workbench.colorCustomizations', key: 'editorBracketHighlight.foreground1', type: 'color', description: 'Bracket color level 1.' },
      { label: 'Bracket Highlight 2', section: 'workbench.colorCustomizations', key: 'editorBracketHighlight.foreground2', type: 'color', description: 'Bracket color level 2.' },
      { label: 'Bracket Highlight 3', section: 'workbench.colorCustomizations', key: 'editorBracketHighlight.foreground3', type: 'color', description: 'Bracket color level 3.' },
      { label: 'Bracket Highlight 4', section: 'workbench.colorCustomizations', key: 'editorBracketHighlight.foreground4', type: 'color', description: 'Bracket color level 4.' },
      { label: 'Bracket Highlight 5', section: 'workbench.colorCustomizations', key: 'editorBracketHighlight.foreground5', type: 'color', description: 'Bracket color level 5.' },
      { label: 'Bracket Highlight 6', section: 'workbench.colorCustomizations', key: 'editorBracketHighlight.foreground6', type: 'color', description: 'Bracket color level 6.' },
      { label: 'Unexpected Bracket', section: 'workbench.colorCustomizations', key: 'editorBracketHighlight.unexpectedBracket.foreground', type: 'color', description: 'Color of unexpected brackets.' },

      { label: 'Fold Background', section: 'workbench.colorCustomizations', key: 'editor.foldBackground', type: 'color', description: 'Background for folded ranges. This color must be transparent or it will obscure content.' },
      { label: 'Fold Placeholder Foreground', section: 'workbench.colorCustomizations', key: 'editor.foldPlaceholderForeground', type: 'color', description: 'Color of collapsed text.' },

      { label: 'Overview Ruler Background', section: 'workbench.colorCustomizations', key: 'editorOverviewRuler.background', type: 'color', description: 'Overview ruler background.' },
      { label: 'Overview Ruler Border', section: 'workbench.colorCustomizations', key: 'editorOverviewRuler.border', type: 'color', description: 'Overview ruler border.' },

      { label: 'Error Foreground', section: 'workbench.colorCustomizations', key: 'editorError.foreground', type: 'color', description: 'Error squiggles color.' },
      { label: 'Error Border', section: 'workbench.colorCustomizations', key: 'editorError.border', type: 'color', description: 'Error border.' },
      { label: 'Error Background', section: 'workbench.colorCustomizations', key: 'editorError.background', type: 'color', description: 'Error background. This color must be transparent or it will obscure content.' },

      { label: 'Warning Foreground', section: 'workbench.colorCustomizations', key: 'editorWarning.foreground', type: 'color', description: 'Warning squiggles color.' },
      { label: 'Warning Border', section: 'workbench.colorCustomizations', key: 'editorWarning.border', type: 'color', description: 'Warning border.' },
      { label: 'Warning Background', section: 'workbench.colorCustomizations', key: 'editorWarning.background', type: 'color', description: 'Warning background. This color must be transparent or it will obscure content.' },

      { label: 'Info Foreground', section: 'workbench.colorCustomizations', key: 'editorInfo.foreground', type: 'color', description: 'Info squiggles color.' },
      { label: 'Info Border', section: 'workbench.colorCustomizations', key: 'editorInfo.border', type: 'color', description: 'Info border.' },
      { label: 'Info Background', section: 'workbench.colorCustomizations', key: 'editorInfo.background', type: 'color', description: 'Info background. This color must be transparent or it will obscure content.' },

      { label: 'Hint Foreground', section: 'workbench.colorCustomizations', key: 'editorHint.foreground', type: 'color', description: 'Hint color.' },
      { label: 'Hint Border', section: 'workbench.colorCustomizations', key: 'editorHint.border', type: 'color', description: 'Hint border. ' },

      { label: 'Problems Error Icon', section: 'workbench.colorCustomizations', key: 'problemsErrorIcon.foreground', type: 'color', description: 'Problems error icon color.' },
      { label: 'Problems Warning Icon', section: 'workbench.colorCustomizations', key: 'problemsWarningIcon.foreground', type: 'color', description: 'Problems warning icon color.' },
      { label: 'Problems Info Icon', section: 'workbench.colorCustomizations', key: 'problemsInfoIcon.foreground', type: 'color', description: 'Problems info icon color.' },

      { label: 'Unnecessary Code Border', section: 'workbench.colorCustomizations', key: 'editorUnnecessaryCode.border', type: 'color', description: 'Border for unused code.' },
      { label: 'Unnecessary Code Opacity', section: 'workbench.colorCustomizations', key: 'editorUnnecessaryCode.opacity', type: 'color', description: 'Opacity of unused code.' },

      { label: 'Gutter Background', section: 'workbench.colorCustomizations', key: 'editorGutter.background', type: 'color', description: 'Gutter background.' },
      { label: 'Gutter Modified', section: 'workbench.colorCustomizations', key: 'editorGutter.modifiedBackground', type: 'color', description: 'Modified line gutter.' },
      { label: 'Gutter Added', section: 'workbench.colorCustomizations', key: 'editorGutter.addedBackground', type: 'color', description: 'Added line gutter.' },
      { label: 'Gutter Deleted', section: 'workbench.colorCustomizations', key: 'editorGutter.deletedBackground', type: 'color', description: 'Deleted line gutter.' }
    ],
  },
  {
    label: 'Diff Editor',
    description: 'The diff editor shows differences between two files. It can be used for example in the source control view to show changes made to a file (coloring inserted and removed text).',
    settings: [
      { label: 'Inserted Text Background', section: 'workbench.colorCustomizations', key: 'diffEditor.insertedTextBackground', type: 'color', description: 'Background color for text that got inserted. The color must not be opaque so as not to hide underlying decorations.' },
      { label: 'Inserted Text Border', section: 'workbench.colorCustomizations', key: 'diffEditor.insertedTextBorder', type: 'color', description: 'Outline color for the text that got inserted.' },

      { label: 'Removed Text Background', section: 'workbench.colorCustomizations', key: 'diffEditor.removedTextBackground', type: 'color', description: 'Background color for text that got removed. The color must not be opaque so as not to hide underlying decorations.' },
      { label: 'Removed Text Border', section: 'workbench.colorCustomizations', key: 'diffEditor.removedTextBorder', type: 'color', description: 'Outline color for text that got removed.' },

      { label: 'Diff Editor Border', section: 'workbench.colorCustomizations', key: 'diffEditor.border', type: 'color', description: 'Border color between the two text editors.' },
      { label: 'Diff Editor Diagonal Fill', section: 'workbench.colorCustomizations', key: 'diffEditor.diagonalFill', type: 'color', description: 'Color of the diff editor diagonal fill used in side-by-side views.' },

      { label: 'Inserted Line Background', section: 'workbench.colorCustomizations', key: 'diffEditor.insertedLineBackground', type: 'color', description: 'Background color for lines that got inserted. The color must not be opaque so as not to hide underlying decorations.' },
      { label: 'Removed Line Background', section: 'workbench.colorCustomizations', key: 'diffEditor.removedLineBackground', type: 'color', description: 'Background color for lines that got removed. The color must not be opaque so as not to hide underlying decorations.' },

      { label: 'Gutter Inserted Line Background', section: 'workbench.colorCustomizations', key: 'diffEditorGutter.insertedLineBackground', type: 'color', description: 'Background color for the margin where lines got inserted.' },
      { label: 'Gutter Removed Line Background', section: 'workbench.colorCustomizations', key: 'diffEditorGutter.removedLineBackground', type: 'color', description: 'Background color for the margin where lines got removed.' },

      { label: 'Overview Inserted Foreground', section: 'workbench.colorCustomizations', key: 'diffEditorOverview.insertedForeground', type: 'color', description: 'Diff overview ruler foreground for inserted content.' },
      { label: 'Overview Removed Foreground', section: 'workbench.colorCustomizations', key: 'diffEditorOverview.removedForeground', type: 'color', description: 'Diff overview ruler foreground for removed content.' },

      { label: 'Unchanged Region Background', section: 'workbench.colorCustomizations', key: 'diffEditor.unchangedRegionBackground', type: 'color', description: 'The color of unchanged blocks in diff editor.' },
      { label: 'Unchanged Region Foreground', section: 'workbench.colorCustomizations', key: 'diffEditor.unchangedRegionForeground', type: 'color', description: 'The foreground color of unchanged blocks in the diff editor.' },
      { label: 'Unchanged Region Shadow', section: 'workbench.colorCustomizations', key: 'diffEditor.unchangedRegionShadow', type: 'color', description: 'The color of the shadow around unchanged region widgets.' },
      { label: 'Unchanged Code Background', section: 'workbench.colorCustomizations', key: 'diffEditor.unchangedCodeBackground', type: 'color', description: 'The background color of unchanged code in the diff editor.' },

      { label: 'Moved Text Border', section: 'workbench.colorCustomizations', key: 'diffEditor.move.border', type: 'color', description: 'The border color for text that got moved in the diff editor.' },
      { label: 'Moved Text Active Border', section: 'workbench.colorCustomizations', key: 'diffEditor.moveActive.border', type: 'color', description: 'The active border color for text that got moved in the diff editor.' },

      { label: 'Multi Diff Header Background', section: 'workbench.colorCustomizations', key: 'multiDiffEditor.headerBackground', type: 'color', description: "The background color of the diff editor's header." },
      { label: 'Multi Diff Background', section: 'workbench.colorCustomizations', key: 'multiDiffEditor.background', type: 'color', description: 'The background color of the multi file diff editor.' },
      { label: 'Multi Diff Border', section: 'workbench.colorCustomizations', key: 'multiDiffEditor.border', type: 'color', description: 'The border color of the multi file diff editor.' }
    ],
  },
  {
    label: 'Editor Groups',
    description: 'Editor groups are used to split the editor area into multiple groups.',
    settings: [
      { label: 'Border', section: 'workbench.colorCustomizations', key: 'editorGroup.border', type: 'color', description: 'Color to separate multiple editor groups from each other.' },

      { label: 'Drop Background', section: 'workbench.colorCustomizations', key: 'editorGroup.dropBackground', type: 'color', description: 'Background color when dragging editors around.' },

      { label: 'Header No Tabs Background', section: 'workbench.colorCustomizations', key: 'editorGroupHeader.noTabsBackground', type: 'color', description: 'Background color of the editor group title header when using single Tab.' },
      { label: 'Header Tabs Background', section: 'workbench.colorCustomizations', key: 'editorGroupHeader.tabsBackground', type: 'color', description: 'Background color of the Tabs container.' },
      { label: 'Header Tabs Border', section: 'workbench.colorCustomizations', key: 'editorGroupHeader.tabsBorder', type: 'color', description: 'Border color below the editor tabs control when tabs are enabled.' },
      { label: 'Header Border', section: 'workbench.colorCustomizations', key: 'editorGroupHeader.border', type: 'color', description: 'Border color between editor group header and editor.' },

      { label: 'Empty Background', section: 'workbench.colorCustomizations', key: 'editorGroup.emptyBackground', type: 'color', description: 'Background color of an empty editor group.' },
      { label: 'Focused Empty Border', section: 'workbench.colorCustomizations', key: 'editorGroup.focusedEmptyBorder', type: 'color', description: 'Border color of an empty focused editor group.' },

      { label: 'Drop Prompt Foreground', section: 'workbench.colorCustomizations', key: 'editorGroup.dropIntoPromptForeground', type: 'color', description: 'Foreground color of text shown when dragging files over editors.' },
      { label: 'Drop Prompt Background', section: 'workbench.colorCustomizations', key: 'editorGroup.dropIntoPromptBackground', type: 'color', description: 'Background color of text shown when dragging files over editors.' },
      { label: 'Drop Prompt Border', section: 'workbench.colorCustomizations', key: 'editorGroup.dropIntoPromptBorder', type: 'color', description: 'Border color of text shown when dragging files over editors.' },

      { label: 'Editor Pane Background', section: 'workbench.colorCustomizations', key: 'editorPane.background', type: 'color', description: 'Background color of the editor pane in centered layout.' },

      { label: 'Side By Side Horizontal Border', section: 'workbench.colorCustomizations', key: 'sideBySideEditor.horizontalBorder', type: 'color', description: 'Border between editors stacked vertically.' },
      { label: 'Side By Side Vertical Border', section: 'workbench.colorCustomizations', key: 'sideBySideEditor.verticalBorder', type: 'color', description: 'Border between editors side by side.' }
    ],
  },
  {
    label: 'Tabs',
    description: 'Tabs are used to switch between open editors in the editor area.',
    settings: [
      { label: 'Active Background', section: 'workbench.colorCustomizations', key: 'tab.activeBackground', type: 'color', description: 'Active tab background color in an active group.' },
      { label: 'Unfocused Active Background', section: 'workbench.colorCustomizations', key: 'tab.unfocusedActiveBackground', type: 'color', description: 'Active tab background color in an inactive group.' },

      { label: 'Active Foreground', section: 'workbench.colorCustomizations', key: 'tab.activeForeground', type: 'color', description: 'Active tab foreground color in an active group.' },

      { label: 'Border', section: 'workbench.colorCustomizations', key: 'tab.border', type: 'color', description: 'Border to separate tabs from each other.' },
      { label: 'Active Border', section: 'workbench.colorCustomizations', key: 'tab.activeBorder', type: 'color', description: 'Bottom border for the active tab.' },
      { label: 'Active Border Top', section: 'workbench.colorCustomizations', key: 'tab.activeBorderTop', type: 'color', description: 'Top border for the active tab.' },

      { label: 'Selected Border Top', section: 'workbench.colorCustomizations', key: 'tab.selectedBorderTop', type: 'color', description: 'Border to the top of a selected tab.' },
      { label: 'Selected Background', section: 'workbench.colorCustomizations', key: 'tab.selectedBackground', type: 'color', description: 'Background of a selected tab.' },
      { label: 'Selected Foreground', section: 'workbench.colorCustomizations', key: 'tab.selectedForeground', type: 'color', description: 'Foreground of a selected tab.' },

      { label: 'Drag And Drop Border', section: 'workbench.colorCustomizations', key: 'tab.dragAndDropBorder', type: 'color', description: 'Border to indicate tab insertion position.' },

      { label: 'Unfocused Active Border', section: 'workbench.colorCustomizations', key: 'tab.unfocusedActiveBorder', type: 'color', description: 'Bottom border for active tab in inactive group.' },
      { label: 'Unfocused Active Border Top', section: 'workbench.colorCustomizations', key: 'tab.unfocusedActiveBorderTop', type: 'color', description: 'Top border for active tab in inactive group.' },

      { label: 'Last Pinned Border', section: 'workbench.colorCustomizations', key: 'tab.lastPinnedBorder', type: 'color', description: 'Border separating pinned and unpinned tabs.' },

      { label: 'Inactive Background', section: 'workbench.colorCustomizations', key: 'tab.inactiveBackground', type: 'color', description: 'Inactive tab background color.' },
      { label: 'Unfocused Inactive Background', section: 'workbench.colorCustomizations', key: 'tab.unfocusedInactiveBackground', type: 'color', description: 'Inactive tab background in unfocused group.' },

      { label: 'Inactive Foreground', section: 'workbench.colorCustomizations', key: 'tab.inactiveForeground', type: 'color', description: 'Inactive tab foreground color.' },
      { label: 'Unfocused Active Foreground', section: 'workbench.colorCustomizations', key: 'tab.unfocusedActiveForeground', type: 'color', description: 'Active tab foreground in inactive group.' },
      { label: 'Unfocused Inactive Foreground', section: 'workbench.colorCustomizations', key: 'tab.unfocusedInactiveForeground', type: 'color', description: 'Inactive tab foreground in inactive group.' },

      { label: 'Hover Background', section: 'workbench.colorCustomizations', key: 'tab.hoverBackground', type: 'color', description: 'background when hovering.' },
      { label: 'Unfocused Hover Background', section: 'workbench.colorCustomizations', key: 'tab.unfocusedHoverBackground', type: 'color', description: 'background in unfocused group when hovering.' },

      { label: 'Hover Foreground', section: 'workbench.colorCustomizations', key: 'tab.hoverForeground', type: 'color', description: 'foreground when hovering.' },
      { label: 'Unfocused Hover Foreground', section: 'workbench.colorCustomizations', key: 'tab.unfocusedHoverForeground', type: 'color', description: 'foreground in unfocused group when hovering.' },

      { label: 'Hover Border', section: 'workbench.colorCustomizations', key: 'tab.hoverBorder', type: 'color', description: 'Border to highlight tabs when hovering.' },
      { label: 'Unfocused Hover Border', section: 'workbench.colorCustomizations', key: 'tab.unfocusedHoverBorder', type: 'color', description: 'Border to highlight tabs in unfocused group when hovering.' },

      { label: 'Active Modified Border', section: 'workbench.colorCustomizations', key: 'tab.activeModifiedBorder', type: 'color', description: 'Top border for modified active tabs.' },
      { label: 'Inactive Modified Border', section: 'workbench.colorCustomizations', key: 'tab.inactiveModifiedBorder', type: 'color', description: 'Top border for modified inactive tabs.' },
      { label: 'Unfocused Active Modified Border', section: 'workbench.colorCustomizations', key: 'tab.unfocusedActiveModifiedBorder', type: 'color', description: 'Top border for modified active tabs in inactive group.' },
      { label: 'Unfocused Inactive Modified Border', section: 'workbench.colorCustomizations', key: 'tab.unfocusedInactiveModifiedBorder', type: 'color', description: 'Top border for modified inactive tabs in inactive group.' },
    ],
  },
  {
    label: 'Minimap',
    description: 'The minimap is a small overview of the source code on the side of the editor.',
    settings: [
      { label: 'Find Match Highlight', section: 'workbench.colorCustomizations', key: 'minimap.findMatchHighlight', type: 'color', description: 'Highlight color for matches from search within files.' },
      { label: 'Selection Highlight', section: 'workbench.colorCustomizations', key: 'minimap.selectionHighlight', type: 'color', description: 'Highlight color for the editor selection.' },
      { label: 'Error Highlight', section: 'workbench.colorCustomizations', key: 'minimap.errorHighlight', type: 'color', description: 'Highlight color for errors within the editor.' },
      { label: 'Warning Highlight', section: 'workbench.colorCustomizations', key: 'minimap.warningHighlight', type: 'color', description: 'Highlight color for warnings within the editor.' },
      { label: 'Info Highlight', section: 'workbench.colorCustomizations', key: 'minimap.infoHighlight', type: 'color', description: 'Minimap marker color for infos.' },

      { label: 'Background', section: 'workbench.colorCustomizations', key: 'minimap.background', type: 'color', description: 'Minimap background color.' },
      { label: 'Foreground Opacity', section: 'workbench.colorCustomizations', key: 'minimap.foregroundOpacity', type: 'color', description: 'Opacity of foreground elements rendered in the minimap.' },

      { label: 'Selection Occurrence Highlight', section: 'workbench.colorCustomizations', key: 'minimap.selectionOccurrenceHighlight', type: 'color', description: 'Minimap marker color for repeating editor selections.' },
      { label: 'Chat Edit Highlight', section: 'workbench.colorCustomizations', key: 'minimap.chatEditHighlight', type: 'color', description: 'Color of pending edit regions in the minimap.' },

      { label: 'Slider Background', section: 'workbench.colorCustomizations', key: 'minimapSlider.background', type: 'color', description: 'Minimap slider background color.' },
      { label: 'Slider Hover Background', section: 'workbench.colorCustomizations', key: 'minimapSlider.hoverBackground', type: 'color', description: 'Minimap slider background color when hovering.' },
      { label: 'Slider Active Background', section: 'workbench.colorCustomizations', key: 'minimapSlider.activeBackground', type: 'color', description: 'Minimap slider background color when clicked.' },

      { label: 'Gutter Added Background', section: 'workbench.colorCustomizations', key: 'minimapGutter.addedBackground', type: 'color', description: 'Minimap gutter color for added content.' },
      { label: 'Gutter Modified Background', section: 'workbench.colorCustomizations', key: 'minimapGutter.modifiedBackground', type: 'color', description: 'Minimap gutter color for modified content.' },
      { label: 'Gutter Deleted Background', section: 'workbench.colorCustomizations', key: 'minimapGutter.deletedBackground', type: 'color', description: 'Minimap gutter color for deleted content.' },

      { label: 'Inline Chat Inserted', section: 'workbench.colorCustomizations', key: 'editorMinimap.inlineChatInserted', type: 'color', description: 'Minimap marker color for inline chat inserted content.' },
    ],
  },
  {
    label: 'Status Bar',
    description: 'The status bar is displayed at the bottom of the window and shows information about the current file and workspace.',
    settings: [
      { label: 'Background', section: 'workbench.colorCustomizations', key: 'statusBar.background', type: 'color', description: 'Standard Status Bar background color.' },
      { label: 'Foreground', section: 'workbench.colorCustomizations', key: 'statusBar.foreground', type: 'color', description: 'Status Bar foreground color.' },
      { label: 'Border', section: 'workbench.colorCustomizations', key: 'statusBar.border', type: 'color', description: 'Status Bar border separating it from the editor.' },

      { label: 'Debug Background', section: 'workbench.colorCustomizations', key: 'statusBar.debuggingBackground', type: 'color', description: 'Background color when debugging.' },
      { label: 'Debug Foreground', section: 'workbench.colorCustomizations', key: 'statusBar.debuggingForeground', type: 'color', description: 'Foreground color when debugging.' },
      { label: 'Debug Border', section: 'workbench.colorCustomizations', key: 'statusBar.debuggingBorder', type: 'color', description: 'Border color when debugging.' },

      { label: 'No Folder Background', section: 'workbench.colorCustomizations', key: 'statusBar.noFolderBackground', type: 'color', description: 'Background color when no folder is opened.' },
      { label: 'No Folder Foreground', section: 'workbench.colorCustomizations', key: 'statusBar.noFolderForeground', type: 'color', description: 'Foreground color when no folder is opened.' },
      { label: 'No Folder Border', section: 'workbench.colorCustomizations', key: 'statusBar.noFolderBorder', type: 'color', description: 'Border color when no folder is opened.' },

      { label: 'Focus Border', section: 'workbench.colorCustomizations', key: 'statusBar.focusBorder', type: 'color', description: 'Status bar border when focused via keyboard navigation.' },
    ],
  },
  {
    label: 'Status Bar Items',
    description: 'The status bar items are the individual components within the status bar.',
    settings: [
      { label: 'Active Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.activeBackground', type: 'color', description: 'Background when clicking a status bar item.' },
      { label: 'Hover Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.hoverBackground', type: 'color', description: 'Background when hovering a status bar item.' },
      { label: 'Hover Foreground', section: 'workbench.colorCustomizations', key: 'statusBarItem.hoverForeground', type: 'color', description: 'Foreground when hovering a status bar item.' },

      { label: 'Prominent Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.prominentBackground', type: 'color', description: 'Background for prominent status bar items.' },
      { label: 'Prominent Foreground', section: 'workbench.colorCustomizations', key: 'statusBarItem.prominentForeground', type: 'color', description: 'Foreground for prominent status bar items.' },
      { label: 'Prominent Hover Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.prominentHoverBackground', type: 'color', description: 'Hover background for prominent items.' },
      { label: 'Prominent Hover Foreground', section: 'workbench.colorCustomizations', key: 'statusBarItem.prominentHoverForeground', type: 'color', description: 'Hover foreground for prominent items.' },

      { label: 'Remote Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.remoteBackground', type: 'color', description: 'Background for remote indicator.' },
      { label: 'Remote Foreground', section: 'workbench.colorCustomizations', key: 'statusBarItem.remoteForeground', type: 'color', description: 'Foreground for remote indicator.' },
      { label: 'Remote Hover Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.remoteHoverBackground', type: 'color', description: 'Hover background for remote indicator.' },
      { label: 'Remote Hover Foreground', section: 'workbench.colorCustomizations', key: 'statusBarItem.remoteHoverForeground', type: 'color', description: 'Hover foreground for remote indicator.' },

      { label: 'Error Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.errorBackground', type: 'color', description: 'Background for error items.' },
      { label: 'Error Foreground', section: 'workbench.colorCustomizations', key: 'statusBarItem.errorForeground', type: 'color', description: 'Foreground for error items.' },
      { label: 'Error Hover Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.errorHoverBackground', type: 'color', description: 'Hover background for error items.' },
      { label: 'Error Hover Foreground', section: 'workbench.colorCustomizations', key: 'statusBarItem.errorHoverForeground', type: 'color', description: 'Hover foreground for error items.' },

      { label: 'Warning Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.warningBackground', type: 'color', description: 'Background for warning items.' },
      { label: 'Warning Foreground', section: 'workbench.colorCustomizations', key: 'statusBarItem.warningForeground', type: 'color', description: 'Foreground for warning items.' },
      { label: 'Warning Hover Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.warningHoverBackground', type: 'color', description: 'Hover background for warning items.' },
      { label: 'Warning Hover Foreground', section: 'workbench.colorCustomizations', key: 'statusBarItem.warningHoverForeground', type: 'color', description: 'Hover foreground for warning items.' },

      { label: 'Compact Hover Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.compactHoverBackground', type: 'color', description: 'Background when hovering compact items.' },
      { label: 'Focus Border', section: 'workbench.colorCustomizations', key: 'statusBarItem.focusBorder', type: 'color', description: 'Border when focusing via keyboard.' },

      { label: 'Offline Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.offlineBackground', type: 'color', description: 'Background when offline.' },
      { label: 'Offline Foreground', section: 'workbench.colorCustomizations', key: 'statusBarItem.offlineForeground', type: 'color', description: 'Foreground when offline.' },
      { label: 'Offline Hover Background', section: 'workbench.colorCustomizations', key: 'statusBarItem.offlineHoverBackground', type: 'color', description: 'Hover background when offline.' },
      { label: 'Offline Hover Foreground', section: 'workbench.colorCustomizations', key: 'statusBarItem.offlineHoverForeground', type: 'color', description: 'Hover foreground when offline.' },
    ],
  },
  {
    label: 'Window Border',
    description: 'The window border is the area around the edges of the window.',
    settings: [
      { label: 'Active Border', section: 'workbench.colorCustomizations', key: 'window.activeBorder', type: 'color', description: 'Border color for the active (focused) window.' },
      { label: 'Inactive Border', section: 'workbench.colorCustomizations', key: 'window.inactiveBorder', type: 'color', description: 'Border color for inactive (unfocused) windows.' },
    ],
  },
  {
    label: 'Text Colors',
    description: 'Colors inside a text document, such as the welcome page.',
    settings: [
      { label: 'Block Quote Background', key: 'textBlockQuote.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Background color for block quotes in text.' },
      { label: 'Block Quote Border', key: 'textBlockQuote.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Border color for block quotes in text.' },
      { label: 'Code Block Background', key: 'textCodeBlock.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Background color for code blocks in text.' },
      { label: 'Link Active Foreground', key: 'textLink.activeForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Foreground color for links when hovered or clicked.' },
      { label: 'Link Foreground', key: 'textLink.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Foreground color for links in text.' },
      { label: 'Preformat Foreground', key: 'textPreformat.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Foreground color for preformatted text.' },
      { label: 'Preformat Background', key: 'textPreformat.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Background color for preformatted text.' },
      { label: 'Preformat Border', key: 'textPreformat.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Border color for preformatted text.' },
      { label: 'Separator Foreground', key: 'textSeparator.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Color for text separators.' },
    ],
  },
  {
    label: 'Action colors',
    description: 'A set of colors to control the interactions with actions across the workbench.',
    settings: [
      { label: 'Toolbar Hover Background', key: 'toolbar.hoverBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Toolbar background when hovering actions.' },
      { label: 'Toolbar Hover Outline', key: 'toolbar.hoverOutline', section: 'workbench.colorCustomizations', type: 'color', description: 'Toolbar outline when hovering actions.' },
      { label: 'Toolbar Active Background', key: 'toolbar.activeBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Toolbar background when clicking actions.' },

      { label: 'Editor Action List Background', key: 'editorActionList.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Action list background color.' },
      { label: 'Editor Action List Foreground', key: 'editorActionList.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Action list foreground color.' },
      { label: 'Editor Action List Focus Foreground', key: 'editorActionList.focusForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Focused action list foreground color.' },
      { label: 'Editor Action List Focus Background', key: 'editorActionList.focusBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Focused action list background color.' },
    ],
  },
  {
    label: 'Dropdown control',
    description: 'A set of colors for all Dropdown widgets such as in the Integrated Terminal or the Output panel.',
    settings: [
      { label: 'Background', key: 'dropdown.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Dropdown background color.' },
      { label: 'List Background', key: 'dropdown.listBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Dropdown list background color.' },
      { label: 'Border', key: 'dropdown.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Dropdown border color.' },
      { label: 'Foreground', key: 'dropdown.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Dropdown text color.' },
    ],
  },
  {
    label: 'Input control',
    description: 'Colors for input controls such as in the Search view or the Find/Replace dialog. To monitor changes, move this extension to panel or other sidebar view (right click -> Move To).',
    settings: [
      { label: 'Background', key: 'input.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Input box background color.' },
      { label: 'Border', key: 'input.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Input box border color.' },
      { label: 'Foreground', key: 'input.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Input text color.' },
      { label: 'Placeholder Foreground', key: 'input.placeholderForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Placeholder text color.' },

      { label: 'Option Active Background', key: 'inputOption.activeBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Active option background color.' },
      { label: 'Option Active Border', key: 'inputOption.activeBorder', section: 'workbench.colorCustomizations', type: 'color', description: 'Active option border color.' },
      { label: 'Option Active Foreground', key: 'inputOption.activeForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Active option foreground color.' },
      { label: 'Option Hover Background', key: 'inputOption.hoverBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Hovered option background color.' },

      { label: 'Validation Error Background', key: 'inputValidation.errorBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Error validation background.' },
      { label: 'Validation Error Foreground', key: 'inputValidation.errorForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Error validation text color.' },
      { label: 'Validation Error Border', key: 'inputValidation.errorBorder', section: 'workbench.colorCustomizations', type: 'color', description: 'Error validation border color.' },

      { label: 'Validation Info Background', key: 'inputValidation.infoBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Info validation background.' },
      { label: 'Validation Info Foreground', key: 'inputValidation.infoForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Info validation text color.' },
      { label: 'Validation Info Border', key: 'inputValidation.infoBorder', section: 'workbench.colorCustomizations', type: 'color', description: 'Info validation border color.' },

      { label: 'Validation Warning Background', key: 'inputValidation.warningBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Warning validation background.' },
      { label: 'Validation Warning Foreground', key: 'inputValidation.warningForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Warning validation text color.' },
      { label: 'Validation Warning Border', key: 'inputValidation.warningBorder', section: 'workbench.colorCustomizations', type: 'color', description: 'Warning validation border color.' },
    ],
  },
  {
    label: 'Scrollbar control',
    description: 'Colors for scrollbar controls such as in the editor or the settings editor.',
    settings: [
      { label: 'Background', key: 'scrollbar.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Scrollbar track background color.' },
      { label: 'Shadow', key: 'scrollbar.shadow', section: 'workbench.colorCustomizations', type: 'color', description: 'Scrollbar shadow color.' },
      { label: 'Slider Background', key: 'scrollbarSlider.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Scrollbar slider background.' },
      { label: 'Slider Hover Background', key: 'scrollbarSlider.hoverBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Scrollbar slider hover background.' },
      { label: 'Slider Active Background', key: 'scrollbarSlider.activeBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Scrollbar slider active background.' },
    ],
  },
  {
    label: 'Badge',
    description: 'Badges are small information labels, for example, search results count.',
    settings: [
      { label: 'Foreground', key: 'badge.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Badge text color.' },
      { label: 'Background', key: 'badge.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Badge background color.' },
    ],
  },
  {
    label: 'Lists and trees',
    description: 'Colors for list and trees like the File Explorer. An active list/tree has keyboard focus, an inactive does not. To monitor changes, move this extension to panel or other sidebar view (right click -> Move To).',
    settings: [
      { label: 'List Active Selection Background', key: 'list.activeSelectionBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Selected item background in active list.' },
      { label: 'List Active Selection Foreground', key: 'list.activeSelectionForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Selected item text in active list.' },
      { label: 'List Hover Background', key: 'list.hoverBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Hover background for list items.' },
      { label: 'List Hover Foreground', key: 'list.hoverForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Hover foreground for list items.' },
      { label: 'List Inactive Selection Background', key: 'list.inactiveSelectionBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Selected item background in inactive list.' },
      { label: 'List Inactive Selection Foreground', key: 'list.inactiveSelectionForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Selected item text in inactive list.' },

      { label: 'List Highlight Foreground', key: 'list.highlightForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Search highlight color in lists.' },
      { label: 'List Error Foreground', key: 'list.errorForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'List items with errors.' },
      { label: 'List Warning Foreground', key: 'list.warningForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'List items with warnings.' },
      { label: 'List Drop Background', key: 'list.dropBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Drag and drop background.' },

      { label: 'Tree Indent Guides Stroke', key: 'tree.indentGuidesStroke', section: 'workbench.colorCustomizations', type: 'color', description: 'Indent guide color.' },
      { label: 'Tree Inactive Indent Guides Stroke', key: 'tree.inactiveIndentGuidesStroke', section: 'workbench.colorCustomizations', type: 'color', description: 'Inactive indent guide color.' },
      { label: 'Tree Table Columns Border', key: 'tree.tableColumnsBorder', section: 'workbench.colorCustomizations', type: 'color', description: 'Table column border color.' },
      { label: 'Tree Table Odd Rows Background', key: 'tree.tableOddRowsBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Odd row background color.' }
    ],
  },
  {
    label: 'Button control',
    description: 'A set of colors for button widgets such as Open Folder button in the Explorer of a new window.',
    settings: [
      { label: 'Background', section: 'workbench.colorCustomizations', key: 'button.background', type: 'color', description: 'The background color of buttons.' },
      { label: 'Foreground', section: 'workbench.colorCustomizations', key: 'button.foreground', type: 'color', description: 'The foreground color of buttons.' },
      { label: 'Hover Background', section: 'workbench.colorCustomizations', key: 'button.hoverBackground', type: 'color', description: 'The background color of buttons when hovering.' },
      { label: 'Border', section: 'workbench.colorCustomizations', key: 'button.border', type: 'color', description: 'The border color of buttons.' },
      { label: 'Secondary Background', section: 'workbench.colorCustomizations', key: 'button.secondaryBackground', type: 'color', description: 'The background color of secondary buttons.' },
      { label: 'Secondary Foreground', section: 'workbench.colorCustomizations', key: 'button.secondaryForeground', type: 'color', description: 'The foreground color of secondary buttons.' },
      { label: 'Secondary Hover Background', section: 'workbench.colorCustomizations', key: 'button.secondaryHoverBackground', type: 'color', description: 'The background color of secondary buttons when hovering.' },
      { label: 'Secondary Border', section: 'workbench.colorCustomizations', key: 'button.secondaryBorder', type: 'color', description: 'The border color of secondary buttons.' },
      { label: 'Separator', section: 'workbench.colorCustomizations', key: 'button.separator', type: 'color', description: 'The color of the button separator.' },
    ],
  },
  {
    label: 'Command Center',
    description: 'The command center is a panel that provides quick access to common commands and actions.',
    settings: [
      { label: 'Background', section: 'workbench.colorCustomizations', key: 'commandCenter.background', type: 'color', description: 'The background color of the command center.' },
      { label: 'Foreground', section: 'workbench.colorCustomizations', key: 'commandCenter.foreground', type: 'color', description: 'The foreground color of the command center.' },
      { label: 'Active Background', section: 'workbench.colorCustomizations', key: 'commandCenter.activeBackground', type: 'color', description: 'The active background color of the command center.' },
      { label: 'Active Foreground', section: 'workbench.colorCustomizations', key: 'commandCenter.activeForeground', type: 'color', description: 'The active foreground color of the command center.' },
      { label: 'Border', section: 'workbench.colorCustomizations', key: 'commandCenter.border', type: 'color', description: 'The border color of the command center.' },
      { label: 'Inactive Foreground', section: 'workbench.colorCustomizations', key: 'commandCenter.inactiveForeground', type: 'color', description: 'The inactive foreground color of the command center.' },
      { label: 'Inactive Border', section: 'workbench.colorCustomizations', key: 'commandCenter.inactiveBorder', type: 'color', description: 'The inactive border color of the command center.' },
      { label: 'Active Border', section: 'workbench.colorCustomizations', key: 'commandCenter.activeBorder', type: 'color', description: 'The active border color of the command center.' },
      { label: 'Debugging Background', section: 'workbench.colorCustomizations', key: 'commandCenter.debuggingBackground', type: 'color', description: 'The debugging background color of the command center.' },
    ],
  },
  {
    label: 'Panel',
    description: 'The panel is a container for views like the Terminal and Problems.',
    settings: [
      { label: 'Background', section: 'workbench.colorCustomizations', key: 'panel.background', type: 'color', description: 'Panel background color.' },
      { label: 'Border', section: 'workbench.colorCustomizations', key: 'panel.border', type: 'color', description: 'Panel border color separating it from editor.' },
      { label: 'Drop Border', section: 'workbench.colorCustomizations', key: 'panel.dropBorder', type: 'color', description: 'Drag and drop feedback color for panel titles.' },

      { label: 'Title Active Border', section: 'workbench.colorCustomizations', key: 'panelTitle.activeBorder', type: 'color', description: 'Border for active panel title.' },
      { label: 'Title Active Foreground', section: 'workbench.colorCustomizations', key: 'panelTitle.activeForeground', type: 'color', description: 'Title color for active panel.' },
      { label: 'Title Inactive Foreground', section: 'workbench.colorCustomizations', key: 'panelTitle.inactiveForeground', type: 'color', description: 'Title color for inactive panel.' },
      { label: 'Title Border', section: 'workbench.colorCustomizations', key: 'panelTitle.border', type: 'color', description: 'Border separating panel title from content.' },

      { label: 'Title Badge Background', section: 'workbench.colorCustomizations', key: 'panelTitleBadge.background', type: 'color', description: 'Panel title badge background.' },
      { label: 'Title Badge Foreground', section: 'workbench.colorCustomizations', key: 'panelTitleBadge.foreground', type: 'color', description: 'Panel title badge foreground.' },

      { label: 'Input Border', section: 'workbench.colorCustomizations', key: 'panelInput.border', type: 'color', description: 'Input border in panel.' },

      { label: 'Section Border', section: 'workbench.colorCustomizations', key: 'panelSection.border', type: 'color', description: 'Panel section border.' },
      { label: 'Section Drop Background', section: 'workbench.colorCustomizations', key: 'panelSection.dropBackground', type: 'color', description: 'Drag and drop background for panel sections.' },

      { label: 'Section Header Background', section: 'workbench.colorCustomizations', key: 'panelSectionHeader.background', type: 'color', description: 'Panel section header background.' },
      { label: 'Section Header Foreground', section: 'workbench.colorCustomizations', key: 'panelSectionHeader.foreground', type: 'color', description: 'Panel section header foreground.' },
      { label: 'Section Header Border', section: 'workbench.colorCustomizations', key: 'panelSectionHeader.border', type: 'color', description: 'Panel section header border.' },

      { label: 'Sticky Scroll Background', section: 'workbench.colorCustomizations', key: 'panelStickyScroll.background', type: 'color', description: 'Sticky scroll background in panel.' },
      { label: 'Sticky Scroll Border', section: 'workbench.colorCustomizations', key: 'panelStickyScroll.border', type: 'color', description: 'Sticky scroll border in panel.' },
      { label: 'Sticky Scroll Shadow', section: 'workbench.colorCustomizations', key: 'panelStickyScroll.shadow', type: 'color', description: 'Sticky scroll shadow in panel.' },

      { label: 'Output View Background', section: 'workbench.colorCustomizations', key: 'outputView.background', type: 'color', description: 'Output view background color.' },
      { label: 'Output View Sticky Scroll Background', section: 'workbench.colorCustomizations', key: 'outputViewStickyScroll.background', type: 'color', description: 'Output view sticky scroll background color.' }
    ],
  },
  {
    label: 'Progress Bar',
    description: 'The progress bar is used to show the progress of long running operations.',
    settings: [
      { label: 'Background', section: 'workbench.colorCustomizations', key: 'progressBar.background', type: 'color', description: 'The background color of the progress bar.' },
    ],
  },
  {
    label: 'Chat',
    description: 'Colors for chat interactions across the workbench.',
    settings: [
      { label: 'Chat Request Border', key: 'chat.requestBorder', section: 'workbench.colorCustomizations', type: 'color', description: 'Border color of a chat request.' },
      { label: 'Chat Request Background', key: 'chat.requestBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Background color of a chat request.' },
      { label: 'Chat Slash Command Background', key: 'chat.slashCommandBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Background color of a chat slash command.' },
      { label: 'Chat Slash Command Foreground', key: 'chat.slashCommandForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Foreground color of a chat slash command.' },
      { label: 'Chat Avatar Background', key: 'chat.avatarBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Background color of a chat avatar.' },
      { label: 'Chat Avatar Foreground', key: 'chat.avatarForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Foreground color of a chat avatar.' },
      { label: 'Chat Edited File Foreground', key: 'chat.editedFileForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Foreground color of edited files in chat.' },
      { label: 'Chat Lines Added Foreground', key: 'chat.linesAddedForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Foreground color of added lines in chat diff.' },
      { label: 'Chat Lines Removed Foreground', key: 'chat.linesRemovedForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Foreground color of removed lines in chat diff.' },
      { label: 'Chat Request Code Border', key: 'chat.requestCodeBorder', section: 'workbench.colorCustomizations', type: 'color', description: 'Border color of code blocks in chat request.' },
      { label: 'Chat Request Bubble Background', key: 'chat.requestBubbleBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Background color of chat request bubble.' },
      { label: 'Chat Request Bubble Hover Background', key: 'chat.requestBubbleHoverBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Hover background color of chat request bubble.' },
      { label: 'Chat Checkpoint Separator', key: 'chat.checkpointSeparator', section: 'workbench.colorCustomizations', type: 'color', description: 'Chat checkpoint separator color.' },
      { label: 'Chat Thinking Shimmer', key: 'chat.thinkingShimmer', section: 'workbench.colorCustomizations', type: 'color', description: 'Shimmer highlight for thinking labels.' },
      { label: 'Chat Management Sash Border', key: 'chatManagement.sashBorder', section: 'workbench.colorCustomizations', type: 'color', description: 'Splitview sash border color in chat management.' },
    ],
  },
  {
    label: 'Inline Chat',
    description: 'Colors for inline chat widget embedded directly inside the editor.',
    settings: [
      { label: 'Inline Chat Background', key: 'inlineChat.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Background color of inline chat widget.' },
      { label: 'Inline Chat Foreground', key: 'inlineChat.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Foreground color of inline chat widget.' },
      { label: 'Inline Chat Border', key: 'inlineChat.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Border color of inline chat widget.' },
      { label: 'Inline Chat Shadow', key: 'inlineChat.shadow', section: 'workbench.colorCustomizations', type: 'color', description: 'Shadow color of inline chat widget.' },

      { label: 'Inline Chat Input Border', key: 'inlineChatInput.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Border color of inline chat input.' },
      { label: 'Inline Chat Input Focus Border', key: 'inlineChatInput.focusBorder', section: 'workbench.colorCustomizations', type: 'color', description: 'Focused border color of inline chat input.' },
      { label: 'Inline Chat Input Placeholder Foreground', key: 'inlineChatInput.placeholderForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Placeholder text color of inline chat input.' },
      { label: 'Inline Chat Input Background', key: 'inlineChatInput.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Background color of inline chat input.' },

      { label: 'Inline Chat Diff Inserted', key: 'inlineChatDiff.inserted', section: 'workbench.colorCustomizations', type: 'color', description: 'Inserted text background in inline chat diff.' },
      { label: 'Inline Chat Diff Removed', key: 'inlineChatDiff.removed', section: 'workbench.colorCustomizations', type: 'color', description: 'Removed text background in inline chat diff.' },
    ],
  },
  {
    label: 'Panel Chat',
    description: 'Colors for interactive panel-based code execution (notebooks / interactive editor).',
    settings: [
      { label: 'Interactive Active Code Border', key: 'interactive.activeCodeBorder', section: 'workbench.colorCustomizations', type: 'color', description: 'Border of active code cell.' },
      { label: 'Interactive Inactive Code Border', key: 'interactive.inactiveCodeBorder', section: 'workbench.colorCustomizations', type: 'color', description: 'Border of inactive code cell.' },
    ],
  },
  {
    label: 'Editor Widget',
    description: 'Colors for editor widget elements.',
    settings: [
      { label: 'Editor Widget Foreground', key: 'editorWidget.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Foreground color of editor widgets.' },
      { label: 'Editor Widget Background', key: 'editorWidget.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Background color of editor widgets.' },
      { label: 'Editor Widget Border', key: 'editorWidget.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Border color of editor widget.' },
      { label: 'Editor Widget Resize Border', key: 'editorWidget.resizeBorder', section: 'workbench.colorCustomizations', type: 'color', description: 'Resize border color of editor widget.' },

      { label: 'Suggest Widget Background', key: 'editorSuggestWidget.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Suggestion widget background.' },
      { label: 'Suggest Widget Border', key: 'editorSuggestWidget.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Suggestion widget border.' },
      { label: 'Suggest Widget Foreground', key: 'editorSuggestWidget.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Suggestion widget text color.' },
      { label: 'Suggest Widget Highlight Foreground', key: 'editorSuggestWidget.highlightForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Match highlight color.' },
      { label: 'Suggest Widget Focus Highlight Foreground', key: 'editorSuggestWidget.focusHighlightForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Focused match highlight color.' },
      { label: 'Suggest Widget Selected Background', key: 'editorSuggestWidget.selectedBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Selected item background.' },
      { label: 'Suggest Widget Selected Foreground', key: 'editorSuggestWidget.selectedForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Selected item foreground.' },
      { label: 'Suggest Widget Selected Icon Foreground', key: 'editorSuggestWidget.selectedIconForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Selected item icon color.' },
      { label: 'Suggest Widget Status Foreground', key: 'editorSuggestWidgetStatus.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Suggest widget status text color.' },

      { label: 'Editor Hover Foreground', key: 'editorHoverWidget.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Hover text color.' },
      { label: 'Editor Hover Background', key: 'editorHoverWidget.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Hover background.' },
      { label: 'Editor Hover Border', key: 'editorHoverWidget.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Hover border color.' },
      { label: 'Editor Hover Highlight Foreground', key: 'editorHoverWidget.highlightForeground', section: 'workbench.colorCustomizations', type: 'color', description: 'Active parameter highlight.' },
      { label: 'Editor Hover Status Bar Background', key: 'editorHoverWidget.statusBarBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Hover status bar background.' },

      { label: 'Editor Ghost Text Foreground', key: 'editorGhostText.foreground', section: 'workbench.colorCustomizations', type: 'color', description: 'Ghost text color.' },
      { label: 'Editor Ghost Text Background', key: 'editorGhostText.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Ghost text background.' },
      { label: 'Editor Ghost Text Border', key: 'editorGhostText.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Ghost text border.' },

      { label: 'Editor Sticky Scroll Background', key: 'editorStickyScroll.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Sticky scroll background.' },
      { label: 'Editor Sticky Scroll Border', key: 'editorStickyScroll.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Sticky scroll border.' },
      { label: 'Editor Sticky Scroll Shadow', key: 'editorStickyScroll.shadow', section: 'workbench.colorCustomizations', type: 'color', description: 'Sticky scroll shadow.' },
      { label: 'Editor Sticky Scroll Gutter Background', key: 'editorStickyScrollGutter.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Sticky scroll gutter background.' },
      { label: 'Editor Sticky Scroll Hover Background', key: 'editorStickyScrollHover.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Sticky scroll hover background.' },

      { label: 'Debug Exception Widget Background', key: 'debugExceptionWidget.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Exception widget background.' },
      { label: 'Debug Exception Widget Border', key: 'debugExceptionWidget.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Exception widget border.' },

      { label: 'Editor Marker Navigation Background', key: 'editorMarkerNavigation.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Marker navigation background.' },
      { label: 'Editor Marker Navigation Error Background', key: 'editorMarkerNavigationError.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Error marker background.' },
      { label: 'Editor Marker Navigation Warning Background', key: 'editorMarkerNavigationWarning.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Warning marker background.' },
      { label: 'Editor Marker Navigation Info Background', key: 'editorMarkerNavigationInfo.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Info marker background.' },
    ],
  },
  {
    label: 'Peek View',
    description: 'Colors for peek views, for example, peek definition.',
    settings: [
      { label: 'Peek View Border', key: 'peekView.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Peek view border color.' },
      { label: 'Peek View Editor Background', key: 'peekViewEditor.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Peek editor background.' },
      { label: 'Peek View Result Background', key: 'peekViewResult.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Peek result background.' },
      { label: 'Peek View Title Background', key: 'peekViewTitle.background', section: 'workbench.colorCustomizations', type: 'color', description: 'Peek title background.' },
    ],
  },
  {
    label: 'Merge Conflicts',
    description: 'Colors for merge conflict editor.',
    settings: [
      { label: 'Merge Current Header Background', key: 'merge.currentHeaderBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Current merge header background.' },
      { label: 'Merge Current Content Background', key: 'merge.currentContentBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Current merge content background.' },
      { label: 'Merge Incoming Header Background', key: 'merge.incomingHeaderBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Incoming merge header background.' },
      { label: 'Merge Incoming Content Background', key: 'merge.incomingContentBackground', section: 'workbench.colorCustomizations', type: 'color', description: 'Incoming merge content background.' },
      { label: 'Merge Border', key: 'merge.border', section: 'workbench.colorCustomizations', type: 'color', description: 'Merge border color.' }
    ],
  },
];
