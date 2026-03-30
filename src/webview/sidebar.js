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
    addListeners('.element-group-container', 'click', handleExpandCollapse);
    addListeners('.element-group-container', 'keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') handleExpandCollapse(e);
    });

    addListeners('.scope-reset', 'click', handleScopeReset);
    addListeners('.reset-group', 'click', handleGroupReset);

    addListeners('.element-group-container', 'mouseenter', handleGroupHover);
    addListeners('.element-group-container', 'mouseleave', handleGroupLeave);
    addListeners('.setting-label', 'mouseenter', handleHover);
    addListeners('.setting-label', 'mouseleave', handleLeave);

    addListenersColorInput();
    addListenersNumberInput();
    addListenersStringInput();
    addListenersSelectInput();
    addListenersResetElement();

    const btnGlobal = document.getElementById('btn-global');
    const btnWorkspace = document.getElementById('btn-workspace');
    const enableHighlighting = document.getElementById('enableHighlighting');

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
    if (enableHighlighting) {
      enableHighlighting.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        vscode.postMessage({ type: 'toggleHighlighting', enabled: isChecked });
      });
    }
  }

  function addListenersColorInput(selector) {
    selector = selector ?? '';
    vscode.postMessage({ type: 'consoleLog', message: `Adding color input listeners for selector: '${selector}'` });
    addListeners(`${selector}.picker`, 'input', handleColorChange);
    addListeners(`${selector}.picker`, 'change', handleColorChange);
    addListeners(`${selector}.picker-hex`, 'input', handleHexColorInput);
    addListeners(`${selector}.color-rgb`, 'input', handleColorRgbChange);
    addListeners(`${selector}.color-rgb`, 'change', handleColorRgbChange);
    addListeners(`${selector}.opacity-slider`, 'input', handleOpacityChange);
  }

  function addListenersNumberInput(selector) {
    selector = selector ?? '';
    addListeners(`${selector}.number-input`, 'input', handleNumberChange);
    addListeners(`${selector}.number-up`, 'click', handleArrowClick(true));
    addListeners(`${selector}.number-down`, 'click', handleArrowClick(false));
  }

  function addListenersStringInput(selector) {
    selector = selector ?? '';
    addListeners(`${selector}.string-input`, 'input', handleStringChange);
  }

  function addListenersSelectInput(selector) {
    selector = selector ?? '';
    addListeners(`${selector}.select-input`, 'change', handleSelectChange);
  }

  function addListenersResetElement(selector) {
    selector = selector ?? '';
    addListeners(`${selector}.reset-element`, 'click', handleElementReset);
  }

  function getClosestDataSetting(event) {
    const element = event.target.closest('.element-row');
    const settingEncoded = element.dataset.setting;
    return JSON.parse(decodeURIComponent(settingEncoded));
  }

  function handleArrowClick(isUp) {
    return function(event) {
      event.preventDefault();
      const button = event.currentTarget;
      const wrapper = button.closest('.number-input-wrapper');
      const input = wrapper.querySelector('.number-input');
      if (!input) return;

      let newValue = parseInt(input.value) || 5; // Start from 5 so that the first click sets it to 6
      const min = parseInt(input.min) || 6;
      const max = parseInt(input.max) || 100;
      const step = parseInt(input.step) || 1;

      if (isUp) {
        newValue = Math.min(newValue + step, max);
      } else {
        newValue = Math.max(newValue - step, min);
      }
      input.value = newValue;

      const changeEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(changeEvent);
    }
  }
  
  function handleExpandCollapse(event) {
    if (event.target.closest('.reset-group')) {
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

  function handleGroupReset(event) {
    event.preventDefault();
    event.stopPropagation();
    const resetIcon = event.currentTarget;
    const header = resetIcon.closest('.element-header');
    const group = header.closest('.element-group');
    const label = group?.getAttribute('data-label');
    if (label) {
      vscode.postMessage({ type: 'resetGroup', label });
    }
  }

  function handleElementReset(event) {
    event.preventDefault();
    event.stopPropagation();
    const setting = getClosestDataSetting(event);
    if (setting) {
      vscode.postMessage({ type: 'resetElement', setting });
    }
  }

  function replaceElement(section, key, elementType, options, newHtml) {
        const target = document.getElementById(`${section}.${key}`);
        target.outerHTML = newHtml;
        const dynamicId = `${section}.${key}`;
        const escapedId = CSS.escape(dynamicId);
        const selector = `#${escapedId} `;

        if (elementType === 'color') {
          addListenersColorInput(selector);
        }
        if (elementType === 'number') {
          addListenersNumberInput(selector);
        }
        if (elementType === 'string' && options) {
          addListenersSelectInput(selector);
        }
        if (elementType === 'string' && !options) {
          addListenersStringInput(selector);
        }
        addListenersResetElement(selector);
  }

  function handleScopeReset(event) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget.getAttribute('data-target');
    if (target === 'Global' || target === 'Workspace') {
      vscode.postMessage({ type: 'resetScope', target });
    }
  }

  function handleSelectChange(event) {
    const select = event.currentTarget;
    const setting = getClosestDataSetting(event);
    vscode.postMessage({ type: 'setString', setting, value: select.value });
  }

  function handleHexColorInput(event) {
    const input = event.currentTarget;
    let value = input.value;
    
    // Remove any invalid characters (keep only # and hex digits)
    value = value.replace(/[^#0-9a-fA-F]/g, '');
    
    // Ensure it starts with #
    if (value && !value.startsWith('#')) {
      value = '#' + value;
    }
    
    // Limit to 9 characters (#RRGGBBAA)
    if (value.length > 9) {
      value = value.substring(0, 9);
    }
    
    input.value = value;
  }

  function handleGroupHover(event) {
    const group = event.currentTarget.closest('.element-group');
    const firstSetting = group.querySelector('.setting-label');
    if (firstSetting) {
      const key = firstSetting.getAttribute('data-key');
      vscode.postMessage({ type: 'hover', key });
    }
  }

  function handleGroupLeave(event) {
    const group = event.currentTarget.closest('.element-group');
    const firstSetting = group.querySelector('.setting-label');
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
    const setting = getClosestDataSetting(event);
    const value = input.value;

    // Validate hex color format: #RRGGBB or #RRGGBBAA
    if (input.classList.contains('picker-hex')) {
      // For text input, validate 6 or 8 digit hex
      if (!/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)) {
        console.warn(`Invalid hex color format: ${value}. Expected #RRGGBB or #RRGGBBAA`);
        return;
      }
    }

    // Hide the default label since a custom color is set
    const group = event.target.closest('.color-input-group');
    const picker = group.querySelector('.picker');
    if (picker) {
      picker.title = value;
    }
    
    vscode.postMessage({ type: 'setColor', setting, color: value });
  }

  function handleColorRgbChange(event) {
    const input = event.currentTarget;
    const setting = getClosestDataSetting(event);
    const rgbColor = input.value; // e.g., #FF0000
    
    // Get the opacity slider in the same group
    const group = input.closest('.color-input-group');
    const opacitySlider = group?.querySelector('.opacity-slider');
    const opacityPercent = opacitySlider?.value || '100';
    
    // Convert percentage to hex (0-255)
    const opacityHex = Math.round((parseInt(opacityPercent) / 100) * 255).toString(16).padStart(2, '0').toUpperCase();
    
    // Combine RGB and alpha: #RRGGBBAA
    const fullColor = rgbColor + opacityHex;
    vscode.postMessage({ type: 'setColor', setting, color: fullColor });
  }

  function handleOpacityChange(event) {
    const slider = event.currentTarget;
    const setting = getClosestDataSetting(event);
    const opacityPercent = slider.value;
    
    // Update the opacity label
    slider.title = `Opacity: ${opacityPercent}%`;
    
    // Get the RGB color from the color picker in the same group
    const group = slider.closest('.color-input-group');
    const colorRgb = group?.querySelector('.color-rgb')?.value || '#000000';
    
    // Convert percentage to hex (0-255)
    const opacityHex = Math.round((parseInt(opacityPercent) / 100) * 255).toString(16).padStart(2, '0').toUpperCase();
    
    // Combine RGB and alpha: #RRGGBBAA
    const fullColor = colorRgb + opacityHex;
    
    vscode.postMessage({ type: 'setColor', setting, color: fullColor });
  }

  function handleNumberChange(event) {
    const input = event.currentTarget;
    if (input.value < 6 || input.value > 100) {
      return;
    }
    const setting = getClosestDataSetting(event);
    vscode.postMessage({ type: 'setNumber', setting, value: input.value });
  }

  function handleStringChange(event) {
    const input = event.currentTarget;
    const setting = getClosestDataSetting(event);
    vscode.postMessage({ type: 'setString', setting, value: input.value });
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
        btnGlobal.title = msg.available ? 'Global (User) customizations are not available. Close folder or workspace to proceed.' : '';
        // const icon = document.querySelector('.scope-control .scope-reset[data-target="Global"]');
        // if (icon) icon.classList.toggle('disabled', btnGlobal.disabled);
      }
      if (btnWorkspace) {
        btnWorkspace.disabled = !msg.available;
        btnWorkspace.title = !msg.available ? 'Workspace customizations are not available without an open folder or workspace.' : '';
        const icon = document.querySelector('.scope-control .scope-reset[data-target="Workspace"]');
        if (icon) {
          icon.classList.toggle('disabled', btnWorkspace.disabled);
          icon.title = btnWorkspace.title;
        }
      }
      if (msg.configTarget) setActiveConfigButton(msg.configTarget);
      return;
    }
    
    if (msg.type === 'setTheme') {
      setThemeClass(msg.theme);
      return;
    }
    
    if (msg.type === 'replaceElement') {
      replaceElement(msg.section, msg.key, msg.elementType, msg.options, msg.newHtml);
      return;
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    vscode.postMessage({ type: 'requestState' });
  });
})();
