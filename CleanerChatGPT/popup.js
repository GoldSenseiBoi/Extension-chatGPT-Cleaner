import { deleteConversation, getConversations } from "./scripts/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("conversation-list");
  const cleanButton = document.getElementById("clean-button");
  const saveTokenBtn = document.getElementById("save-token");
  const clearTokenBtn = document.getElementById("clear-token");
  const tokenInput = document.getElementById("token-input");
  const selectAllBtn = document.getElementById("select-all-btn");
  const clearSelectionBtn = document.getElementById("clear-selection-btn");
  const selectedCountSpan = document.getElementById("selected-count");
  const helpButton = document.getElementById("help-button");

  helpButton?.addEventListener("click", () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("help.html") });
  });

  // Manually save the token
  saveTokenBtn?.addEventListener("click", () => {
    const token = tokenInput?.value.trim();
    if (!token || !token.startsWith("ey")) {
      alert("Invalid token.");
      return;
    }
    chrome.storage.local.set({ authToken: token }, () => {
      console.log("[CleanerChatGPT] Token saved.");
      location.reload();
    });
  });

  // Remove the token
  clearTokenBtn?.addEventListener("click", () => {
    chrome.storage.local.remove("authToken", () => {
      console.log("[CleanerChatGPT] Token deleted.");
      location.reload();
    });
  });

  // Select all conversations
  selectAllBtn?.addEventListener("click", () => {
    document.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = true);
    updateSelectedCount();
  });

  // Deselect all conversations
  clearSelectionBtn?.addEventListener("click", () => {
    document.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = false);
    updateSelectedCount();
  });

  // Update the selected conversations count
  function updateSelectedCount() {
    const selected = document.querySelectorAll("input[type='checkbox']:checked").length;
    selectedCountSpan.textContent = `${selected} selected${selected !== 1 ? 's' : ''}`;
  }

  try {
    const conversations = await getConversations();

    if (!conversations.length) {
      list.innerHTML = "<p style='color:white'>No conversations found.</p>";
      return;
    }

    conversations.forEach((conv) => {
      const item = document.createElement("div");
      item.innerHTML = `
        <label style="color:white">
          <input type="checkbox" data-id="${conv.id}" />
          ${conv.title || "(Untitled)"}
        </label>
      `;
      list.appendChild(item);
    });

    // Listen for changes on checkboxes
    list.addEventListener("change", (e) => {
      if (e.target && e.target.matches("input[type='checkbox']")) {
        updateSelectedCount();
      }
    });

    cleanButton.addEventListener("click", async () => {
      const selected = [...document.querySelectorAll("input:checked")].map(cb => cb.dataset.id);

      if (!selected.length) {
        alert("Please select at least one conversation.");
        return;
      }

      const confirmDelete = confirm(`You are about to delete ${selected.length} conversation(s). Are you sure?`);
      if (!confirmDelete) return;

      for (const id of selected) {
        try {
          await deleteConversation(id);
          console.log(`Conversation ${id} deleted.`);
        } catch (err) {
          console.error(`Error deleting ${id}`, err);
        }
      }

      alert("Deletion completed. Please refresh the page.");
      location.reload();
    });

  } catch (error) {
    list.innerHTML = `<p style='color:red'>Error: ${error.message}</p>`;
    console.error(error);
  }
});
