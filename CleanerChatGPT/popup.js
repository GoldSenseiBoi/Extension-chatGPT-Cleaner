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

  // Sauvegarde manuelle du token (multi-compte facultatif)
  saveTokenBtn?.addEventListener("click", () => {
    const token = tokenInput?.value.trim();
    if (!token || !token.startsWith("ey")) {
      alert("Token invalide.");
      return;
    }
    const accountKey = prompt("Nom du compte (ex: user1) ?");
    const storageKey = accountKey ? `authToken_${accountKey}` : "authToken";
    chrome.storage.local.set({ [storageKey]: token }, () => {
      alert(`Token enregistré pour ${accountKey || "défaut"} !`);
      location.reload();
    });
  });

  // Suppression du token pour un compte précis
  clearTokenBtn?.addEventListener("click", () => {
    const accountKey = prompt("Nom du compte à supprimer (laisse vide pour le compte par défaut) ?");
    const storageKey = accountKey ? `authToken_${accountKey}` : "authToken";
    chrome.storage.local.remove(storageKey, () => {
      alert(`Token supprimé pour ${accountKey || "défaut"} !`);
      location.reload();
    });
  });

  // Sélectionner toutes les conversations
  selectAllBtn?.addEventListener("click", () => {
    document.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = true);
    updateSelectedCount();
  });

  // Désélectionner toutes les conversations
  clearSelectionBtn?.addEventListener("click", () => {
    document.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = false);
    updateSelectedCount();
  });

  // Met à jour le compteur de conversations sélectionnées
  function updateSelectedCount() {
    const selected = document.querySelectorAll("input[type='checkbox']:checked").length;
    selectedCountSpan.textContent = `${selected} sélectionnée${selected !== 1 ? 's' : ''}`;
  }

  try {
    const conversations = await getConversations();

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

    // Ecouter les changements sur les cases à cocher
    list.addEventListener("change", (e) => {
      if (e.target && e.target.matches("input[type='checkbox']")) {
        updateSelectedCount();
      }
    });

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
    list.innerHTML = `<p style='color:red'>Erreur : ${error.message}</p>`;
    console.error(error);
  }
});
