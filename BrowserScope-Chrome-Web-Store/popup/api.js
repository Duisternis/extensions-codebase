export let config = [];

export async function loadLocalTestCases(token) {
  try {
    const url = chrome.runtime.getURL("./tests.json");
    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to load local config.json");

    const json = await res.json();
    config = json;

    chrome.runtime.sendMessage({ action: "setTests", tests: config });

    return true;
  } catch (error) {
    console.error("Local config loading error:", error);
    return false;
  }
}