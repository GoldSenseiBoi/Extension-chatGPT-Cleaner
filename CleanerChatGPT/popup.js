document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getConversations
    }, (res) => {
      const list = document.getElementById("conversation-list");
      res[0].result.forEach((conv, index) => {
        const item = document.createElement("div");
        item.innerHTML = `
          <label>
            <input type="checkbox" data-index="${index}" />
            ${conv.title}
          </label>
        `;
        list.appendChild(item);
      });

      document.getElementById("clean-button").addEventListener("click", () => {
        const selected = [...document.querySelectorAll("input:checked")].map(cb => res[0].result[cb.dataset.index]);
        chrome.tabs.sendMessage(tabs[0].id, { action: "clean", items: selected });
      });
    });
  });
});

function getConversations() {
  const elements = document.querySelectorAll("nav a.flex");
  return Array.from(elements).map(el => ({
    title: el.innerText.trim(),
    elementId: el.getAttribute("href")
  }));
}
