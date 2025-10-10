import { executeScriptWithNavigationHandling } from "./actionExecutor.js";

export function handleOpenStep(step, tabManager, testname) {
  return new Promise((resolve) => {
    chrome.tabs.create(
      {
        url: step.url,
        active: true,
      },
      function (tab) {
        if (!tab) {
          resolve({
            step: "open",
            url: step.url,
            success: false,
            error: "Failed to create tab",
          });
          return;
        }

        tabManager.trackTab(tab.id);

        if (step.saveTab) {
          tabManager.saveTab(step.saveTab, tab.id);
        }

        const listener = async function (tabId, info) {
          if (tabId !== tab.id || info.status !== "complete") return;

          chrome.tabs.onUpdated.removeListener(listener);

          try {
            const lower = testname.toLowerCase();
            if (
              !lower.includes("copy") &&
              !lower.includes("paste") &&
              !lower.includes("clipboard")
            ) {
              await chrome.action.openPopup();
            }
          } catch (error) {
            console.log("Failed to open popup for test tab:", error);
          }

          executeScriptWithNavigationHandling(
            tab.id,
            step.script_code,
            tabManager
          )
            .then((result) => {
              resolve({
                step: "open",
                url: step.url,
                success: true,
                result: result,
              });
            })
            .catch((error) => {
              resolve({
                step: "open",
                url: step.url,
                success: false,
                error: error.message,
              });
            });
        };

        chrome.tabs.onUpdated.addListener(listener);
      }
    );
  });
}

export async function handleSwitchStep(step, tabManager) {
  try {
    const tabId = await tabManager.switchToTab(step.targetTab);
    const result = await executeScriptWithNavigationHandling(
      tabId,
      step.script_code,
      tabManager
    );
    return {
      step: "switch",
      target: step.targetTab,
      success: true,
      result: result,
    };
  } catch (error) {
    return {
      step: "switch",
      target: step.targetTab,
      success: false,
      error: error.message,
    };
  }
}

export async function runComplexTest(testConfig, tabManager) {
  const stepResults = [];

  for (const step of testConfig.steps) {
    try {
      let result;

      if (step.type === "open") {
        result = await handleOpenStep(step, tabManager, testConfig.name);
      } else if (step.type === "switch") {
        result = await handleSwitchStep(step, tabManager);
      }

      stepResults.push(result);

      if (!result.success) {
        break;
      }
    } catch (error) {
      stepResults.push({
        step: step.type,
        success: false,
        error: error.message,
      });
      break;
    }
  }

  return {
    name: testConfig.name,
    status: stepResults.every((r) => r.result?.success),
    steps: stepResults,
    completedAt: new Date().toISOString(),
  };
}
