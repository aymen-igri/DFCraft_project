





async function getUrls() {
    try {
        const result = await browserAPI.storage.local.get('urls');
        // Si rien n'existe encore, tu peux fournir une valeur par défaut
        return result.urls || [];
    } catch (err) {
        console.error('Erreur lors de la récupération des URLs :', err);
        return [];
    }
}

// Bloquer l'accès à une URL
async function blockAccess(element) {
    if (element.urlBlocked) {
        const tabs = await browserAPI.tabs.query({ active: true, currentWindow: true });
        const tab = tabs[0];
        if (tab && tab.url && tab.url.includes(element.url)) {
            await browserAPI.tabs.update(tab.id, { url: browserAPI.runtime.getURL("staticPages/blocked.html") });
        }
    }
}

// Bloquer ou activer le son sur les onglets
async function blockSound(element) {
    const tabs = await browserAPI.tabs.query({});
    for (const tab of tabs) {
        if (tab.url && tab.url.includes(element.url)) {
            await browserAPI.tabs.update(tab.id, { muted: element.soundBlocked });
        }
    }
}



export function signalReceiverBlocker() {
    browserAPI.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        try {
            if (message.type === "BLOCK") {
                const result = await getUrls
                result.forEach(async (element) => {
                    if (message.sownd) {
                        await blockSound(element);
                    }
                    if (message.acces) {
                        await blockAccess(element);

                    }
                });


                // On peut répondre si on veut
                sendResponse({ status: "ok", message: "Timer lancé !" });
            }
        } catch (error) {
            console.error("Erreur dans le blocage :", error);
            sendResponse({ status: "error", message: err.message });
        }

        return true;
    });
}