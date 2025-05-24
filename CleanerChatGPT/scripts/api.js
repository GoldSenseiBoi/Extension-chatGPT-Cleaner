// File: scripts/api.js

const BASE_URL = "https://chatgpt.com/backend-api";

function getToken() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["authToken"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("[CleanerChatGPT] Erreur chrome.storage :", chrome.runtime.lastError);
        return reject(chrome.runtime.lastError);
      }
      if (!result.authToken) {
        console.warn("[CleanerChatGPT] Aucun token trouvé.");
        return reject(new Error("Aucun token trouvé. Veuillez vous connecter à chatgpt.com."));
      }
      console.log("[CleanerChatGPT] Token récupéré depuis chrome.storage.");
      resolve(result.authToken);
    });
  });
}


export async function getConversations() {
  const token = await getToken();
  const limit = 100;
  let offset = 0;
  let allConversations = [];

  while (true) {
    const res = await fetch(`${BASE_URL}/conversations?offset=${offset}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`Erreur chargement conversations à offset=${offset}`);

    const data = await res.json();
    const items = data.items || [];

    if (items.length === 0) break; // ✅ fin atteinte

    allConversations = allConversations.concat(
      items.map(conv => ({
        id: conv.id,
        title: conv.title,
      }))
    );

    offset += limit;
  }

  return allConversations;
}



export async function deleteConversation(conversationId) {
  const token = await getToken();
  const res = await fetch(`${BASE_URL}/conversation/${conversationId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ is_visible: false }),
  });

  if (!res.ok) throw new Error(`Erreur lors de la suppression de ${conversationId}`);

  return res.status === 200;
}
