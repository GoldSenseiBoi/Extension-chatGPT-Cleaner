// background.js

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    try {
      const authHeader = details.requestHeaders.find(h => h.name.toLowerCase() === 'authorization');
      if (authHeader && authHeader.value.startsWith('Bearer ')) {
        const token = authHeader.value.split(' ')[1];
        // console.log("[CleanerChatGPT] Bearer token détecté :", token.slice(0, 10) + "...");
        chrome.storage.local.set({ authToken: token });
      } else {
        // console.log("[CleanerChatGPT] Aucune Authorization Bearer trouvée dans cette requête.");
      }
    } catch (err) {
      // console.warn("[CleanerChatGPT] Erreur lors de la capture de l'Authorization :", err);
    }

    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["https://chatgpt.com/backend-api/*"] },
  ["requestHeaders", "blocking"]
);

// Réception du token via content_script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  try {
    if (msg.type === "SET_TOKEN" && msg.token?.startsWith("ey")) {
      // console.log("[CleanerChatGPT] Token reçu via content_script :", msg.token.slice(0, 10) + "...");
      chrome.storage.local.set({ authToken: msg.token });
    }
  } catch (err) {
    // console.warn("[CleanerChatGPT] Erreur lors de la réception du token :", err);
  }
});
