// background.js

// 🔍 Capture des requêtes contenant Authorization: Bearer ...
chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const authHeader = details.requestHeaders.find(h => h.name.toLowerCase() === 'authorization');
    if (authHeader && authHeader.value.startsWith('Bearer ')) {
      const token = authHeader.value.split(' ')[1];
      console.log("[CleanerChatGPT] Bearer token détecté :", token.slice(0, 10) + "...");
      chrome.storage.local.set({ authToken: token });
    } else {
      console.log("[CleanerChatGPT] Aucune Authorization Bearer trouvée dans cette requête.");
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["https://chatgpt.com/backend-api/*"] },
  ["requestHeaders", "blocking"]
);

// 📥 Réception des tokens depuis content_script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SET_TOKEN" && msg.token?.startsWith("ey")) {
    console.log("[CleanerChatGPT] Token reçu via content_script :", msg.token.slice(0, 10) + "...");
    chrome.storage.local.set({ authToken: msg.token });
  }
});
