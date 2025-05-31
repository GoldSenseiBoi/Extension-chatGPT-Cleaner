chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const authHeader = details.requestHeaders.find(h => h.name.toLowerCase() === 'authorization');
    if (authHeader && authHeader.value.startsWith('Bearer ')) {
      const token = authHeader.value.split(' ')[1];
      console.log("[CleanerChatGPT] Bearer token detected:", token.slice(0, 10) + "..."); // masks the rest
      chrome.storage.local.set({ authToken: token });
    } else {
      console.log("[CleanerChatGPT] No Authorization Bearer found in this request.");
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["https://chatgpt.com/backend-api/*"] },
  ["requestHeaders", "blocking"]
);
