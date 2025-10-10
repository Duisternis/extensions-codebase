import { executeSingleAction } from "../executor.js";
import { executeNoInject } from "../executorNoInject.js"

export async function executeScriptWithNavigationHandling(
  tabId,
  actions,
  tabManager
) {
  console.log("=== DEBUG: Starting script execution ===");
  console.log("Actions to execute:", actions);

  const results = [];
  let currentTabId = tabId;

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    console.log(`\n--- Executing action ${i}: ${action.action} ---`);
    console.log("Action details:", action);

    let urlBefore;
    try {
      const tabBefore = await chrome.tabs.get(currentTabId);
      urlBefore = tabBefore.url;
      console.log("Current URL before action:", urlBefore);
    } catch (error) {
      console.error("Failed to get tab info:", error);
      break;
    }

    console.log("About to execute action...");
    const result = await executeTestAction(currentTabId, action);
    console.log(`Action ${i} result:`, result);
    results.push(result);

    if (!result.success && !action.continue_on_error) {
      console.log(
        `Action ${i} failed, stopping execution. Error:`,
        result.error
      );
      break;
    }

    console.log("Monitoring for navigation...");
    let navigationDetected = false;
    let newUrl = urlBefore;

    for (let check = 0; check < 15; check++) {
      await new Promise((resolve) => setTimeout(resolve, 100));

      try {
        const tabAfter = await chrome.tabs.get(currentTabId);
        if (tabAfter.url !== urlBefore) {
          navigationDetected = true;
          newUrl = tabAfter.url;
          break;
        }
      } catch (error) {
        console.error("Navigation check failed:", error);
        navigationDetected = true;
        break;
      }
    }

    if (navigationDetected) {
      console.log(`NAVIGATION DETECTED!`);
      console.log(`From: ${urlBefore}`);
      console.log(`To: ${newUrl}`);

      await waitForPageLoad(currentTabId);
      console.log("New page loaded, ready for next action");
    } else {
      console.log("No navigation detected, continuing...");
    }
  }

  const allSuccess = results.every((r) => r.success);
  console.log("=== FINAL RESULTS ===");
  console.log("All successful:", allSuccess);
  console.log("Individual results:", results);

  return {
    success: allSuccess,
    results: results.map((r) => r.details),
    completed_steps: results.length,
    total_steps: actions.length,
  };
}

export async function executeTestAction(tabId, action) {
  try {
    console.log("Injecting action into tab:", tabId);

    if (action.action === "wait") {
      return await executeWaitActionWithNavigationHandling(tabId, action);
    }

    let result;

    if (action.bypass === true) {
      result = await executeNoInject(action);
    } else {
      result = await chrome.scripting.executeScript({
        target: { tabId },
        func: executeSingleAction,
        args: [action],
      });
    }


    console.log("Raw script result:", result);

    const scriptResult = result?.[0]?.result;

    if (!scriptResult) {
      if (action.action === "wait" || action.action === "wait_for_element") {
        console.log(
          "Wait action returned null - likely interrupted by navigation, assuming success"
        );
        return {
          success: true,
          details: { action: action.action, success: true },
          error: null,
        };
      }

      return {
        success: false,
        error: "No result returned from script execution",
      };
    }

    return {
      success: scriptResult.success || false,
      details: scriptResult.result,
      error: scriptResult.error,
    };
  } catch (error) {
    console.error("Script execution failed:", error);

    if (action.action === "wait") {
      console.log(
        "Wait action injection failed - likely navigation occurred, assuming success"
      );
      return {
        success: true,
        details: { action: action.action, success: true },
        error: null,
      };
    }

    return {
      success: false,
      error: error.message,
    };
  }
}

export async function executeWaitActionWithNavigationHandling(tabId, action) {
  console.log("Executing wait action with navigation handling...");

  const urlBefore = (await chrome.tabs.get(tabId)).url;
  const waitDuration = action.duration || 1000;
  const checkInterval = 200;
  const totalChecks = Math.ceil(waitDuration / checkInterval);

  let elapsedTime = 0;
  let navigationDetected = false;

  for (let i = 0; i < totalChecks; i++) {
    await new Promise((resolve) => setTimeout(resolve, checkInterval));
    elapsedTime += checkInterval;

    try {
      const currentTab = await chrome.tabs.get(tabId);
      if (currentTab.url !== urlBefore) {
        console.log(`Navigation detected during wait at ${elapsedTime}ms`);
        console.log(`From: ${urlBefore} To: ${currentTab.url}`);
        navigationDetected = true;

        await waitForPageLoad(tabId);
        break;
      }
    } catch (error) {
      console.error("Tab check failed during wait:", error);
      navigationDetected = true;
      break;
    }
  }

  if (!navigationDetected && elapsedTime < waitDuration) {
    const remainingTime = waitDuration - elapsedTime;
    console.log(`Completing remaining wait time: ${remainingTime}ms`);
    await new Promise((resolve) => setTimeout(resolve, remainingTime));
  }

  console.log(
    `Wait action completed. Navigation detected: ${navigationDetected}`
  );

  return {
    success: true,
    details: {
      action: action.action,
      success: true,
      navigationDetected: navigationDetected,
      actualWaitTime: Math.min(elapsedTime, waitDuration),
    },
    error: undefined,
  };
}

export function waitForPageLoad(tabId) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      chrome.tabs.onUpdated.removeListener(listener);
      console.log("Page load timeout, proceeding anyway");
      resolve();
    }, 10000);

    const listener = function (updatedTabId, changeInfo) {
      if (updatedTabId === tabId && changeInfo.status === "complete") {
        clearTimeout(timeout);
        chrome.tabs.onUpdated.removeListener(listener);
        console.log("Page load complete detected");
        resolve();
      }
    };

    chrome.tabs.onUpdated.addListener(listener);
  });
}

export async function modifyResultsBasedOnDownloads(results, testsToRun) {
  return new Promise((resolve) => {
    chrome.downloads.search(
      { orderBy: ["-startTime"], limit: 20 },
      (downloads) => {
        console.log("Found downloads:", downloads.length);
        const downloadTestIndices = [];
        testsToRun.forEach((test, index) => {
          console.log(test.download);
          if (test.download) {
            downloadTestIndices.push(index);
          }
        });

        console.log("Download test indices:", downloadTestIndices);
        console.log(results);
        const modifiedResults = [...results];

        downloadTestIndices.reverse().forEach((testIndex, downloadIndex) => {
          const download = downloads[downloadIndex];

          console.log(download);

          if (download && modifiedResults[testIndex]) {
            const isBlocked = !(
              download.state === "complete" && download.exists
            );

            const originalStatus = modifiedResults[testIndex].status;
            const finalStatus = originalStatus && isBlocked;

            console.log(originalStatus, finalStatus, isBlocked, testIndex);

            modifiedResults[testIndex] = {
              ...modifiedResults[testIndex],
              status: finalStatus,
              downloadInfo: {
                filename: download.filename,
                blocked: isBlocked,
                originalStatus: originalStatus,
              },
            };

            console.log(
              `Test "${testsToRun[testIndex].name}" - Download: ${download.filename}, Blocked: ${isBlocked}`
            );
          }
        });

        console.log("Modified Results:", modifiedResults);

        resolve(modifiedResults);
      }
    );
  });
}
