
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const intervalTime = 100;
    let timePassed = 0;

    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        resolve(element);
      }
      timePassed += intervalTime;
      if (timePassed >= timeout) {
        clearInterval(interval);
        reject(new Error(`Timeout: Element ${selector} not found`));
      }
    }, intervalTime);
  });
}

async function waitForMenuItems(timeout = 3000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const items = [...document.querySelectorAll("*")]
        .filter(el => el.textContent && (
          el.textContent.toLowerCase().includes("delete") ||
          el.textContent.toLowerCase().includes("supprimer")
        ));

      if (items.length > 0) {
        clearInterval(interval);
        resolve(items);
      }

      if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(new Error("Timeout: menu items non trouvés"));
      }
    }, 100);
  });
}


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "clean") {
    console.log("CleanerChatGPT: Démarrage de la suppression...");

    for (const item of request.items) {
      try {
        console.log("CleanerChatGPT: Traitement de", item.elementId);

        const convEl = document.querySelector(`a[href='${item.elementId}']`);
        if (!convEl) {
          console.warn("CleanerChatGPT: Conversation non trouvée :", item.elementId);
          continue;
        }

        convEl.scrollIntoView({ behavior: "smooth" });
        await waitForMenuItems();

        convEl.click();
        console.log("CleanerChatGPT: Conversation cliquée.");
        await wait(1500);

        const parent = convEl.closest("li");
        if (!parent) {
          console.warn("CleanerChatGPT: Élément parent <li> non trouvé.");
          continue;
        }

        const dotsBtn = parent.querySelector("button[aria-haspopup='menu']");
        if (!dotsBtn) {
          console.warn("CleanerChatGPT: Bouton '...' non trouvé.");
          continue;
        }

        dotsBtn.click();
        console.log("CleanerChatGPT: Menu ouvert.");
        await waitForMenuItems();


        const menuItems = await waitForMenuItems();
  console.log("CleanerChatGPT: Items du menu trouvés dynamiquement :", menuItems.map(el => el.textContent.trim()));

  const deleteOption = menuItems.find(el =>
    el.textContent.toLowerCase().includes("delete") ||
    el.textContent.toLowerCase().includes("supprimer")
  );


        if (!deleteOption) {
          console.warn("CleanerChatGPT: Option 'Supprimer' non trouvée.");
          continue;
        }

        deleteOption.click();
        console.log("CleanerChatGPT: Clic sur 'Supprimer'.");
        await wait(1000);

        const confirmBtn = await waitForElement("button.bg-red-600");
        confirmBtn.click();
        console.log("CleanerChatGPT: Clic sur 'Confirmer'.");

        await wait(3000);
        console.log("CleanerChatGPT: Suppression terminée pour", item.elementId);
      } catch (error) {
        console.error("CleanerChatGPT: Erreur lors de la suppression :", error);
      }
    }

    console.log("CleanerChatGPT: Nettoyage terminé.");
  }
});
