export async function storeIndividualTestResult(result) {
  const currentResults = await new Promise((resolve) => {
    chrome.storage.local.get(["currentTestResults"], (data) => {
      resolve(
        data.currentTestResults ? JSON.parse(data.currentTestResults) : []
      );
    });
  });

  currentResults.push({
    ...result,
    timestamp: new Date().toISOString(),
    isNew: true,
  });

  await chrome.storage.local.set({
    currentTestResults: JSON.stringify(currentResults),
    lastTestResult: JSON.stringify(result),
  });
}
