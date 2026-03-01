(() => {
  const vscode = acquireVsCodeApi();

  function setThemeClass(themeClass) {
    document.body.classList.remove('vscode-light', 'vscode-dark', 'vscode-high-contrast');
    if (themeClass) {
      document.body.classList.add(themeClass);
    }
  }

  function addListeners(selector, event, handler) {
    document.querySelectorAll(selector).forEach(el => el.addEventListener(event, handler));
  }

  function attachListeners() {
    addListeners('.element-header', 'click', handleExpandCollapse);
    addListeners('.element-header', 'keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') handleExpandCollapse(e);
    });
    addListeners('.reset-element', 'click', handleElementReset);

    addListeners('.element-header', 'mouseenter', handleGroupHover);
    addListeners('.element-header', 'mouseleave', handleGroupLeave);
    addListeners('.setting-item', 'mouseenter', handleHover);
    addListeners('.setting-item', 'mouseleave', handleLeave);
    addListeners('.position-select', 'change', handlePositionChange);

    addListeners('.picker', 'input', handleColorChange);
    addListeners('.picker', 'change', handleColorChange);
    addListeners('.number-input', 'input', handleNumberChange);
    addListeners('.string-input', 'input', handleStringChange);

    addListeners('.scope-reset', 'click', handleScopeReset);

    const btnGlobal = document.getElementById('btn-global');
    const btnWorkspace = document.getElementById('btn-workspace');

    if (btnGlobal) {
      btnGlobal.addEventListener('click', () => {
        vscode.postMessage({ type: 'setConfigTarget', target: 'Global' });
        setActiveConfigButton('Global');
      });
    }
    if (btnWorkspace) {
      btnWorkspace.addEventListener('click', () => {
        vscode.postMessage({ type: 'setConfigTarget', target: 'Workspace' });
        setActiveConfigButton('Workspace');
      });
    }
  }

  function handleExpandCollapse(event) {
    if (event.target.closest('.reset-element')) {
      return;
    }
    const header = event.currentTarget;
    const group = header.closest('.element-group');
    const settings = group.querySelector('.element-settings');
    const icon = header.querySelector('.expand-icon');
    const expanded = settings.style.display !== 'none';
    settings.style.display = expanded ? 'none' : 'block';
    icon.innerHTML = expanded ? '+' : '\u2212';
  }

  function handleElementReset(event) {
    event.preventDefault();
    event.stopPropagation();
    const resetIcon = event.currentTarget;
    const header = resetIcon.closest('.element-header');
    const group = header.closest('.element-group');
    const keys = group?.getAttribute('data-keys')?.split(',').filter(k => k.trim()) || [];
    if (keys.length > 0) {
      vscode.postMessage({ type: 'resetGroup', keys });
    }
  }

  function handleScopeReset(event) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget.getAttribute('data-target');
    if (target === 'Global' || target === 'Workspace') {
      vscode.postMessage({ type: 'resetScope', target });
    }
  }

  function handlePositionChange(event) {
    const select = event.currentTarget;
    const key = select.getAttribute('data-key');
    vscode.postMessage({ type: 'setString', key, value: select.value });
  }

  function handleGroupHover(event) {
    const group = event.currentTarget.closest('.element-group');
    const firstSetting = group.querySelector('.setting-item');
    if (firstSetting) {
      const key = firstSetting.getAttribute('data-key');
      vscode.postMessage({ type: 'hover', key });
    }
  }

  function handleGroupLeave(event) {
    const group = event.currentTarget.closest('.element-group');
    const firstSetting = group.querySelector('.setting-item');
    if (firstSetting) {
      const key = firstSetting.getAttribute('data-key');
      vscode.postMessage({ type: 'leave', key });
    }
  }

  function handleHover(event) {
    const key = event.currentTarget.getAttribute('data-key');
    vscode.postMessage({ type: 'hover', key });
  }

  function handleLeave(event) {
    const key = event.currentTarget.getAttribute('data-key');
    vscode.postMessage({ type: 'leave', key });
  }

  function handleColorChange(event) {
    const input = event.currentTarget;
    const key = input.getAttribute('data-key');
    vscode.postMessage({ type: 'setColor', key, color: input.value });
  }

  function handleNumberChange(event) {
    const input = event.currentTarget;
    const key = input.getAttribute('data-key');
    vscode.postMessage({ type: 'setNumber', key, value: input.value });
  }

  function handleStringChange(event) {
    const input = event.currentTarget;
    const key = input.getAttribute('data-key');
    vscode.postMessage({ type: 'setString', key, value: input.value });
  }

  function setActiveConfigButton(target) {
    const btnGlobal = document.getElementById('btn-global');
    const btnWorkspace = document.getElementById('btn-workspace');
    [btnGlobal, btnWorkspace].forEach(btn => btn?.classList.remove('active'));
    if (target === 'Global') btnGlobal?.classList.add('active');
    if (target === 'Workspace') btnWorkspace?.classList.add('active');
  }

  attachListeners();

  window.addEventListener('message', event => {
    const msg = event.data;
    if (msg.type === 'workspaceAvailability') {
      const btnGlobal = document.getElementById('btn-global');
      const btnWorkspace = document.getElementById('btn-workspace');
      if (btnGlobal) {
        btnGlobal.disabled = !!msg.available;
        btnGlobal.title = msg.available ? 'Global config is not available in workspace' : '';
        const icon = document.querySelector('.scope-control .scope-reset[data-target="Global"]');
        if (icon) icon.classList.toggle('disabled', btnGlobal.disabled);
      }
      if (btnWorkspace) {
        btnWorkspace.disabled = !msg.available;
        btnWorkspace.title = !msg.available ? 'No workspace available' : '';
        const icon = document.querySelector('.scope-control .scope-reset[data-target="Workspace"]');
        if (icon) icon.classList.toggle('disabled', btnWorkspace.disabled);
      }
      if (msg.configTarget) setActiveConfigButton(msg.configTarget);
      attachListeners();
    } else if (msg.type === 'setTheme') {
      setThemeClass(msg.theme);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    vscode.postMessage({ type: 'requestState' });
  });
})();
