async function getPostureResults() {
  if (!(chrome.storage && chrome.storage.local)) {
    console.warn("Chrome storage not available");
    return null;
  }

  try {
    const data = await new Promise((resolve) =>
      chrome.storage.local.get(["postureResults"], resolve)
    );
    return data.postureResults ? data.postureResults : null;
  } catch (error) {
    console.error("Error retrieving posture results:", error);
    return null;
  }
}

function escapeText(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderCategory(title, data) {
  if (!data || typeof data !== 'object') return '';
  
  const items = Object.entries(data).map(([key, value]) => {
    if (value === null || value === undefined) return '';
    
    const displayKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    let displayValue;

    if (displayKey == "Platform") return null;
    
    if (Array.isArray(value)) {
      if (value.length === 0) {
        displayValue = 'None';
      } else if (value.length > 3) {
        displayValue = `${value.length} items`;
      } else {
        displayValue = value.join(', ');
      }
    } else if (typeof value === 'object') {
      displayValue = JSON.stringify(value);
    } else {
      displayValue = String(value);
    }
    
    return `
      <div class="browser-item">
        <span class="browser-key">${escapeText(displayKey)}</span>
        <span class="browser-value">${escapeText(displayValue)}</span>
      </div>
    `;
  }).filter(item => item).join('');
  
  if (!items) return '';
  
  return `
    <div class="browser-category">
      <h4>${title}</h4>
      ${items}
    </div>
  `;
}

function renderExtensionsList(extensions) {
  if (!Array.isArray(extensions) || extensions.length === 0) {
    return '<div class="browser-item"><span class="browser-key">Extensions</span><span class="browser-value">None installed</span></div>';
  }
  
  const items = extensions.map(ext => `
    <div class="browser-item">
      <span class="browser-key">${escapeText(ext)}</span>
      <span class="browser-value"></span>
    </div>
  `).join('');
  
  return `
    <div class="browser-category">
      <h4>Installed Extensions</h4>
      ${items}
    </div>
  `;
}

function renderBrowserTabs(postureData) {
  if (!postureData) {
    const tabs = ['general', 'security', 'hardware', 'fingerprints', 'others'];
    tabs.forEach(tab => {
      const container = document.getElementById(`browserTab${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
      if (container) {
        container.innerHTML = '<div class="muted">No browser information available</div>';
      }
    });
    return;
  }

  const generalData = [
    renderCategory('Basic Information', postureData.basicInfo),
    renderCategory('Display', postureData.display),
    renderCategory('Location', postureData.location)
  ].filter(cat => cat).join('');
  
  const securityData = [
    renderCategory('Permissions', postureData.permissions),
    renderCategory('Security Settings', postureData.security),
    renderCategory('Browser Security', postureData.browserSecurity),
    renderCategory('User Behavior', postureData.userBehavior)
  ].filter(cat => cat).join('');
  
  const hardwareData = [
    renderCategory('Hardware', postureData.hardware),
    renderCategory('Storage', postureData.storage),
    renderCategory('Media Devices', postureData.media),
    renderCategory('Device Sensors', postureData.deviceSensors)
  ].filter(cat => cat).join('');
  
  const fingerprintsData = [
    renderCategory('Extensions Summary', {
      totalInstalled: postureData.extensions?.totalInstalled,
      enabledCount: postureData.extensions?.enabledCount,
      disabledCount: postureData.extensions?.disabledCount
    }),
    postureData.extensions?.installedExtensions ? renderExtensionsList(postureData.extensions.installedExtensions) : '',
    renderCategory('Canvas & WebGL', {
      canvas: postureData.fingerprints?.canvas ? 'Available' : 'Not available',
      webgl: postureData.fingerprints?.webgl,
      webglExtensions: postureData.fingerprints?.webglParams?.extensions,
      maxTextureSize: postureData.fingerprints?.webglParams?.maxTextureSize
    }),
    renderCategory('System Fonts', {
      detectedFonts: postureData.fingerprints?.fonts ? 'Available' : 'Not detected'
    })
  ].filter(cat => cat).join('');
  
  const othersData = [
    renderCategory('Automation Detection', postureData.automation),
    renderCategory('Network Privacy', postureData.networkPrivacy),
  ].filter(cat => cat).join('');

  document.getElementById('browserTabGeneral').innerHTML = `<div class="browser-grid">${generalData}</div>`;
  document.getElementById('browserTabSecurity').innerHTML = `<div class="browser-grid">${securityData}</div>`;
  document.getElementById('browserTabHardware').innerHTML = `<div class="browser-grid">${hardwareData}</div>`;
  document.getElementById('browserTabFingerprints').innerHTML = `<div class="browser-grid">${fingerprintsData}</div>`;
  document.getElementById('browserTabOthers').innerHTML = `<div class="browser-grid">${othersData}</div>`;
}

function setupBrowserTabs() {
  const tabs = document.querySelectorAll('.browser-tab');
  const contents = document.querySelectorAll('.browser-tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      const targetContent = document.getElementById(`browserTab${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

async function initBrowserInfo() {
  const postureData = await getPostureResults();
  renderBrowserTabs(postureData);
  setupBrowserTabs();
}