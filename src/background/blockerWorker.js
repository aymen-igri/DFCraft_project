import { browserAPI } from "../shared/utils/browserAPI";
import { updateStats } from "../shared/utils/statesUtils.js";

async function getUrls() {
  try {
    const result = await browserAPI.storage.local.get("urls");
    return result.urls || [];
  } catch (err) {
    console.error("Erreur lors de la récupération des URLs :", err);
    return [];
  }
}

async function blockAccess(result, tab) {
  if (!tab || typeof tab.url !== "string") return;

  for (const element of result) {
    if (!element.url) continue; // protection ici

    if (element.urlBlocked && tab.url.includes(element.url)) {
      updateStats("totalDeflectionsAttempted", 1);
      await browserAPI.tabs.update(tab.id, {
        url: browserAPI.runtime.getURL("staticPages/blocked.html"),
      });
    }
  }
}

// Bloquer ou activer le son sur les onglets
async function blockSound(result) {
  const tabs = await browserAPI.tabs.query({});

  for (const element of result) {
    if (!element.soundBlocked) continue;
    if (!element.url) continue; // protection ici

    for (const tab of tabs) {
      if (typeof tab.url !== "string") continue;

      if (tab.url.includes(element.url)) {
        await browserAPI.tabs.update(tab.id, { muted: true });
      }
    }
  }
}

export function blockWorker() {
  browserAPI.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete" || !tab.url) return;
    try {
      const result = await getUrls();
      await blockAccess(result, tab);
      await blockSound(result);
    } catch (error) {
      console.error("Erreur dans le blocage :", error);
    }
  });
}
