// Break Odds Engine — Background
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url?.includes("whatnot.com")) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_PANEL" });
  } catch {
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["js/content.js"] });
    setTimeout(async () => {
      try { await chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_PANEL" }); } catch {}
    }, 600);
  }
});
