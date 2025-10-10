import { runTestSequence } from "./testRunner.js";

let TESTS = [];

const TEST_STATUS = {
  IDLE: "idle",
  RUNNING: "running",
};

let currentTestStatus = TEST_STATUS.IDLE;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setTests") {
    TESTS = request.tests;
    console.log("Better Extension || Tests stored in background as TESTS:", TESTS);
    return true;
  }

  if (request.action === "startTests") {
    if (currentTestStatus === TEST_STATUS.RUNNING) {
      sendResponse({ status: "running" });
      return true;
    }
    currentTestStatus = TEST_STATUS.RUNNING;

    chrome.storage.local.set({ currentTestResults: JSON.stringify([]) }, () => {
      const selectedTestNames = request.selectedTests || [];
      const testsToRun =
        selectedTestNames.length > 0
          ? TESTS.filter((test) =>
              selectedTestNames.includes(
                test.name.toLowerCase().replace(/\s+/g, "_")
              )
            )
          : TESTS;

      runTestSequence(testsToRun).then((results) => {
        currentTestStatus = TEST_STATUS.IDLE;
        sendResponse({ status: "complete", results });
      });
    });

    return true;
  }

  if (request.action === "getStatus") {
    sendResponse({ status: currentTestStatus });
    return true;
  }

  if (request.action === "getTestResults") {
    chrome.storage.local.get(["currentTestResults"], (data) => {
      const results = data.currentTestResults
        ? JSON.parse(data.currentTestResults)
        : [];
      sendResponse({
        currentResults: results,
        allResults: results,
      });
    });
    return true;
  }
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.set({ currentTestResults: JSON.stringify([]) });
});
