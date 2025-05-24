// scripts/content.js

function extractToken() {
  try {
    // Tentative 1 : token injecté dans __NEXT_DATA__
    const nextData = window.__NEXT_DATA__;
    if (nextData?.props?.pageProps?.accessToken) {
      return nextData.props.pageProps.accessToken;
    }

    // Tentative 2 : localStorage
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken?.startsWith("ey")) {
      return storedToken;
    }

    // Tentative 3 : inspection de variables globales
    for (const key in window) {
      if (key.toLowerCase().includes("token") && typeof window[key] === "string") {
        if (window[key].startsWith("ey")) return window[key];
      }
    }
  } catch (err) {
    console.warn("[CleanerChatGPT] Impossible d'extraire le token :", err);
  }
  return null;
}

const token = extractToken();
if (token) {
  chrome.runtime.sendMessage({ type: "SET_TOKEN", token });
  console.log("[CleanerChatGPT] Token capturé automatiquement.");
} else {
  console.warn("[CleanerChatGPT] Aucun token trouvé automatiquement.");
}
