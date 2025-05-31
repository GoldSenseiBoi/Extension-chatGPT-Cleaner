// File: scripts/api.js

const BASE_URL = "https://chatgpt.com/backend-api";

function getToken() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["authToken"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("[CleanerChatGPT] Chrome.storage error:", chrome.runtime.lastError);
        return reject(chrome.runtime.lastError);
      }
      if (!result.authToken) {
        console.warn("[CleanerChatGPT] No token found.");
        return reject(new Error("No token found. Please log in to chatgpt.com."));
      }
      console.log("[CleanerChatGPT] Token retrieved from chrome.storage.");
      resolve(result.authToken);
    });
  });
}

export async function getConversations() {
  const token = await getToken();
  let offset = 0;
  const limit = 100;
  let allConversations = [];

  while (true) {
    const res = await fetch(`${BASE_URL}/conversations?offset=${offset}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error loading conversations.");

    const data = await res.json();
    const conversations = data.items.map((conv) => ({ id: conv.id, title: conv.title }));

    allConversations = allConversations.concat(conversations);

    if (conversations.length < limit) {
      // If fewer than the limit, we've retrieved all conversations
      break;
    }

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

  if (!res.ok) throw new Error(`Error deleting conversation ${conversationId}`);

  return res.status === 200;
}
