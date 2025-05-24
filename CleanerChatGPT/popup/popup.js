document.addEventListener("DOMContentLoaded", async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: scrollToLoadAllConversations
  });

  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: getOnlyConversations
  }, (res) => {
    const list = document.getElementById("conversation-list");
    const conversations = res[0].result;

    conversations.forEach((conv, index) => {
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
      const selected = [...document.querySelectorAll("input:checked")]
        .map(cb => conversations[cb.dataset.index]);

      chrome.tabs.sendMessage(tabs[0].id, {
        action: "clean",
        items: selected
      });
    });
  });
});

function scrollToLoadAllConversations() {
  let lastScroll = 0;
  let retries = 0;

  function scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  const interval = setInterval(() => {
    const current = document.body.scrollHeight;
    if (current === lastScroll) {
      retries++;
    } else {
      retries = 0;
      lastScroll = current;
    }

    if (retries >= 10) {
      clearInterval(interval);
    } else {
      scrollDown();
    }
  }, 1000);
}

function getOnlyConversations() {
  const items = document.querySelectorAll("nav a.flex");

  return Array.from(items).filter(el => {
    const href = el.getAttribute("href");
    return href && href.startsWith("/c/");
  }).map(el => ({
    title: el.innerText.trim() || "Untitled",
    elementId: el.getAttribute("href")
  }));
}
