import { TabManager } from "./tabManager.js";
import { runComplexTest } from "./steps.js";
import { modifyResultsBasedOnDownloads } from "./actionExecutor.js";
import { storeIndividualTestResult } from "./storage.js";

export async function runTestSequence(testsToRun) {
  const results = [];

  for (const testConfig of testsToRun) {
    const tabManager = new TabManager();

    try {
      sendMessage({
        action: "testInitializing",
        testName: testConfig.name,
      });

      await chrome.storage.local.set({
        lastTestResult: JSON.stringify({
          name: testConfig.name,
          status: "initializing",
        }),
      });

      sendMessage({
        action: "testStarted",
        testName: testConfig.name,
        configInfo: `Steps: ${testConfig.steps.length}`,
      });

      const result = await runComplexTest(testConfig, tabManager);

      result.description = testConfig.description;
      result.download = testConfig.download;
      result.category = testConfig.category;

      results.push(result);

      console.log(`Test "${testConfig.name}" completed:`, result);
      await storeIndividualTestResult(result);

      sendMessage({
        action: "testCompleted",
        result: result,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      const errorResult = {
        name: testConfig.name,
        status: "failed",
        error: error.message,
      };
      results.push(errorResult);
      await storeIndividualTestResult(errorResult);

      sendMessage({
        action: "testCompleted",
        result: errorResult,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    await tabManager.cleanup();
  }

  const finalResults = await modifyResultsBasedOnDownloads(results, testsToRun);

  await chrome.storage.local.set({
    currentTestResults: JSON.stringify(finalResults),
  });
  console.log("All tests completed - final results stored:", finalResults);

  sendMessage({
    action: "allTestsComplete",
    results: finalResults,
  });

  try {
    chrome.tabs.create({
      url: chrome.runtime.getURL("./report/report.html"),
      active: true,
    });
  } catch (error) {
    console.error("Failed to open report:", error);
  }

  return finalResults;
}

export function sendMessage(message) {
  chrome.runtime.sendMessage(message, (response) => {
    if (chrome.runtime.lastError) {
      console.log("Message failed:", chrome.runtime.lastError.message);
    }
  });
}
