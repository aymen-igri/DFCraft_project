import { useContext, useEffect } from "react";
import UrlContext from "../context/urlContext";
import { browserAPI } from "../utils/browserAPI";

const useBlockUrl = (BlockedItem, isRunning) => {
  const { urlElements, setUrlElement } = useContext(UrlContext);
  useEffect(() => {
    if (!isRunning) return;
    urlElements.forEach((element) => {
      if (BlockedItem.sownd) blockSound(element);
      if (BlockedItem.acces) blockAccess(element);
    });

    return () => {
      browserAPI.runtime.sendMessage({
        type: "BLOCK",
        sownd: BlockedItem.sownd,
        access: BlockedItem.acces,
      });
    };
  }, [isRunning, BlockedItem, urlElements]);
};

async function dispatcher(isRunning, BlockedItem) {
  if (isRunning) {
    try {
      const message = {
        type: "BLOCK",
        sond: BlockedItem.sond,
        access: BlockedItem.access,
      };
      let response = await browserAPI.runtime.sendMessage(message);
    } catch (error) {
    }
  }
}

// function blockAcces(element) {
//     if (element.urlBlocked) {
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//             const tab = tabs[0]
//             if (tab.url && tab.url.includes(element.url)) {
//                 chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("staticPages/blocked.html") });

//             }
//         })
//     }
// }

// function blockSownd(element) {
//     chrome.tabs.query({}, (tabs) => {
//         tabs.forEach((tab) => {
//             if (tab.url && tab.url.includes(element.url)) {
//                 chrome.tabs.update(tab.id, { muted: element.sowndBlocked });
//             }
//         });
//     });
// }

async function blockAccess(element) {
  if (element.urlBlocked) {
    const tabs = await browserAPI.tabs.query({
      active: true,
      currentWindow: true,
    });
    const tab = tabs[0];
    if (tab && tab.url && tab.url.includes(element.url)) {
      await browserAPI.tabs.update(tab.id, {
        url: browserAPI.runtime.getURL("staticPages/blocked.html"),
      });
    }
  }
}

// Bloquer ou activer le son sur les onglets
async function blockSound(element) {
  const tabs = await browserAPI.tabs.query({});
  for (const tab of tabs) {
    if (tab.url && tab.url.includes(element.url)) {
      await browserAPI.tabs.update(tab.id, { muted: !!element.sowndBlocked });
    }
  }
}

export default useBlockUrl;
