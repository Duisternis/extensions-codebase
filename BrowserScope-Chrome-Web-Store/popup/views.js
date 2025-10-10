import { addEventListenersToSelectionPage } from "./events.js";
import { config } from "./api.js";

const app = document.getElementById("app");

export function renderRunningTestView() {
  const header = document.querySelector(".sqrx-header");
  if (header) {
    header.style.display = "none";
  }

  resizePopup(250, 100);

  app.innerHTML = `
    <div class="minimal-running-container-clean">
      <div class="minimal-running-content-clean">
        <div class="spinner-small" style="width: 24px!important; height: 24px!important; flex-shrink: 0;"></div>
        <div class="running-text-clean">
          <h3>Running Tests</h3>
          <p id="currentTestName">Initializing...</p>
        </div>
      </div>
    </div>
  `;

  updateCurrentTestName();

  const updateInterval = setInterval(() => {
    updateCurrentTestName();
  }, 50);
}

export function renderStartPage() {
  const header = document.querySelector(".sqrx-header");
  if (header) {
    header.style.display = "";
  }

  resizePopup(680, 400);

  const testsByCategory = {};
  config.forEach((test) => {
    const category = test.category || "Uncategorized";
    if (!testsByCategory[category]) {
      testsByCategory[category] = [];
    }
    testsByCategory[category].push(test);
  });

  const testOptionsHTML = Object.keys(testsByCategory)
    .map(
      (test, index) => `
    <label class="test-checkbox-item">
      <input type="checkbox" class="test-checkbox" data-test-value="${test}" checked>
      <span class="test-name">${test} (${testsByCategory[test].length})</span>
    </label>
  `
    )
    .join("");

  app.innerHTML = `
    <div class="simple-test-selection">
      <h2 class="test-heading">Test Scenarios</h2>
      <p class="test-description">This assessment evaluates an organisation's level of protection against common web attacks across multiple vectors.</p>
      
      <div class="select-all-container">
        <input type="checkbox" class="select-all-checkbox" id="selectAllCheckbox" checked>
        <label for="selectAllCheckbox" class="select-all-text">Select All</label>
      </div>
      
      <div class="test-grid">
        ${testOptionsHTML}
      </div>
      
      <button class="run-tests-button-simple">Run Tests</button>
      <p id="alert-message" class="slow-blink">Fetching browser info… don't close this popup.</p>
    </div>
  `;

  addEventListenersToSelectionPage();
}

export function updateCurrentTestName() {
  chrome.storage.local.get(["lastTestResult"], (data) => {
    const testNameElement = document.getElementById("currentTestName");
    if (!testNameElement) return;

    if (data.lastTestResult) {
      const lastResult = JSON.parse(data.lastTestResult);
      testNameElement.textContent = lastResult.name;
    } else {
      testNameElement.textContent = "Preparing tests...";
    }
  });
}

export function resizePopup(width, height) {
  document.documentElement.style.width = width + "px";
  document.documentElement.style.height = height + "px";
  document.body.style.width = width + "px";
  document.body.style.height = height + "px";
}
