// popup.js
import { deleteConversation, getConversations } from "./scripts/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("conversation-list");
  const cleanButton = document.getElementById("clean-button");
  const saveTokenBtn = document.getElementById("save-token");
  const tokenInput = document.getElementById("token-input");
  const selectAllBtn = document.getElementById("select-all-button");
  const selectionCount = document.getElementById("selection-count");
  const loadingMsg = document.getElementById("loading");

  // Sauvegarde manuelle du token si utilisateur colle manuellement
  saveTokenBtn?.addEventListener("click", () => {
    const token = tokenInput?.value.trim();
    if (!token || !token.startsWith("ey")) {
      alert("Token invalide.");
      return;
    }
    chrome.storage.local.set({ authToken: token }, () => {
      alert("Token enregistré !");
      location.reload();
    });
  });

  try {
    // 🕐 Loading UI
    loadingMsg.style.display = "block";
    list.style.display = "none";
    cleanButton.style.display = "none";
    selectAllBtn.style.display = "none";
    selectionCount.style.display = "none";

    const conversations = await getConversations();

    loadingMsg.style.display = "none";
    list.style.display = "block";
    cleanButton.style.display = "inline-block";
    selectAllBtn.style.display = "inline-block";
    selectionCount.style.display = "block";

    if (!conversations.length) {
      list.innerHTML = "<p style='color:white'>Aucune conversation trouvée.</p>";
      return;
    }

    conversations.forEach((conv) => {
      const item = document.createElement("div");
      item.innerHTML = `
        <label style="color:white">
          <input type="checkbox" data-id="${conv.id}" />
          ${conv.title || "(Sans titre)"}
        </label>
      `;
      list.appendChild(item);
    });

    updateSelectionCount();

    cleanButton.addEventListener("click", async () => {
      const selected = [...document.querySelectorAll("input:checked")].map(cb => cb.dataset.id);

      if (!selected.length) {
        alert("Sélectionne au moins une conversation.");
        return;
      }

      const confirmDelete = confirm(`Tu vas supprimer ${selected.length} conversation(s). T’es sûr ?`);
      if (!confirmDelete) return;

      for (const id of selected) {
        try {
          await deleteConversation(id);
          console.log(`Conversation ${id} supprimée.`);
        } catch (err) {
          console.error(`Erreur suppression ${id}`, err);
        }
      }

      alert("Suppression terminée. Recharge la page.");
      location.reload();
    });

  } catch (error) {
    loadingMsg.style.display = "none";
    list.innerHTML = `<p style='color:red'>Erreur : ${error.message}</p>`;
    console.error(error);
  }

  selectAllBtn?.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => cb.checked = true);
    updateSelectionCount();
  });

  document.addEventListener("change", (e) => {
    if (e.target.matches("input[type='checkbox']")) {
      updateSelectionCount();
    }
  });

  function updateSelectionCount() {
    const checkedCount = document.querySelectorAll("input[type='checkbox']:checked").length;
    selectionCount.textContent = `${checkedCount} conversation${checkedCount !== 1 ? 's' : ''} selected${checkedCount !== 1 ? 's' : ''}`;
  }
});
