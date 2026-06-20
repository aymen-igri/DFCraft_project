import { useContext, useEffect } from "react"
import UrlContext from "../context/urlContext";
import { browserAPI } from "../utils/browserAPI"

const useBlockUrl = (BlockedItem , isRunning ) => {
    const { urlElements, setUrlElement } = useContext(UrlContext)
    console.log("useBlockUrl called with BlockedItem:", BlockedItem, "isRunning:", isRunning);
    useEffect(() => {
        if (!isRunning) return;
        urlElements.forEach(element => {
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
}


async function dispatcher(isRunning , BlockedItem){
    console.log("Blocker unmounted ⚡")
    if(isRunning){
        try {
            const message = {
                type : "BLOCK" , 
                sond : BlockedItem.sond  ,
                access : BlockedItem.access 

            }
            let response = await browserAPI.runtime.sendMessage(message) ;
            console.log("C'est la reponce " ,response)
            
        } catch (error) {
            console.log("Erreur lors de l'envois du  signal au worker")
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
    // console.log("Blocking access for element: ", element);
    if (element.urlBlocked) {
        const tabs = await browserAPI.tabs.query({ active: true, currentWindow: true });
        const tab = tabs[0];
        console.log(tab && tab.url && tab.url.includes(element.url) , "Checking if tab URL includes blocked URL");
        if (tab && tab.url && tab.url.includes(element.url)) {
            await browserAPI.tabs.update(tab.id, { url: browserAPI.runtime.getURL("staticPages/blocked.html") });
        }
    }
}

// Bloquer ou activer le son sur les onglets
async function blockSound(element) {
    console.log("Blocking sound for element: ", element);
        const tabs = await browserAPI.tabs.query({});
        for (const tab of tabs) {
            console.log(tab, "Checking tab for sound blocking");
            console.log(tab.url && tab.url.includes(element.url), "Checking if tab URL includes sound blocked URL");
            if (tab.url && tab.url.includes(element.url)) {
                console.log("Muting tab: ", tab);
                await browserAPI.tabs.update(tab.id, { muted: !!element.sowndBlocked });
            }
        }
    }




export default useBlockUrl