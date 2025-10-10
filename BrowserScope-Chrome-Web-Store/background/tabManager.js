export class TabManager {
  constructor() {
    this.tabs = new Map();
    this.allTabs = new Set();
  }

  saveTab(name, tabId) {
    this.tabs.set(name, tabId);
    this.allTabs.add(tabId);
  }

  trackTab(tabId) {
    this.allTabs.add(tabId);
  }

  async switchToTab(name) {
    const tabId = this.tabs.get(name);
    if (tabId) {
      await chrome.tabs.update(tabId, { active: true });
      return tabId;
    }
    throw new Error(`Tab ${name} not found`);
  }

  async cleanup() {
    const closePromises = [];
    for (const tabId of this.allTabs) {
      closePromises.push(
        chrome.tabs.remove(tabId).catch((e) => {
          console.error(`Failed to close tab ${tabId}:`, e);
        })
      );
    }

    await Promise.all(closePromises);
    this.tabs.clear();
    this.allTabs.clear();
  }
}
