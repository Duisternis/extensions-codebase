export async function executeNoInject(action) {
  return new Promise(async (resolve) => {
    const actionResult = { action: action.action, success: false };

    try {
      let extensionId = action.extensionId;
      if (!extensionId) {
        const lookupUrl = action.extensionLookupUrl || "/api/extension-id";
        const resp = await fetch(lookupUrl, { method: "GET" });
        if (!resp.ok)
          throw new Error(`Extension ID lookup failed: ${resp.status}`);
        const data = await resp.json();
        extensionId = data.id || data.extensionId || data.extension_id;
        if (!extensionId)
          throw new Error("No extension id found in lookup response");
      }

      switch (action.action) {
        case "enable_extension":
          await new Promise((res) => {
            chrome.management.setEnabled(extensionId, true, () => {
              if (chrome.runtime.lastError) {
                actionResult.error = chrome.runtime.lastError.message;
                actionResult.success = false;
              } else {
                actionResult.success = true;
                actionResult.message = "Enable request sent";
              }
              res();
            });
          });
          break;

        case "check_extension":
          await new Promise((res) => {
            chrome.management.get(extensionId, (ext) => {
              if (chrome.runtime.lastError) {
                actionResult.error = chrome.runtime.lastError.message;
                actionResult.success = false;
              } else {
                actionResult.success = true;
                actionResult.enabled = !!ext.enabled;
                actionResult.extension = { id: ext.id, name: ext.name };
              }
              res();
            });
          });
          break;

        default:
          actionResult.error = `Unknown action: ${action.action}`;
      }
    } catch (err) {
      actionResult.error = err && err.message ? err.message : String(err);
    }

    if (action.success_result === false)
      actionResult.success = !actionResult.success;

    resolve([
      {
        success: actionResult.success,
        result: actionResult,
      },
    ]);
  });
}
