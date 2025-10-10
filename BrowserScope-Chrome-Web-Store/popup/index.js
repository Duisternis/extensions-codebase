import { renderStartPage, renderRunningTestView } from "./views.js";

import { loadLocalTestCases } from "./api.js";

chrome.runtime.sendMessage({ action: "getStatus" }, async (response) => {
  if (chrome.runtime.lastError) {
    console.log("Could not get status, showing start page.");
    renderStartPage();
    return;
  }

  if (response && response.status === "running") {
    renderRunningTestView();
  } else {
    await loadLocalTestCases();
    renderStartPage();
  }
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const testNameElement = document.getElementById("currentTestName");
  if (!testNameElement) return;

  if (message.action === "testInitializing") {
    testNameElement.textContent = "Initializing...";
  } else if (message.action === "testStarted") {
    testNameElement.textContent = message.testName;
  }

  return true;
});
