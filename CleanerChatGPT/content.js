chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clean") {
    request.items.forEach((item) => {
      const link = document.querySelector(`a[href='${item.elementId}']`);
      if (link) {
        link.click();
        setTimeout(() => {
          const deleteBtn = document.querySelector("button[aria-label='Delete conversation']");
          if (deleteBtn) deleteBtn.click();
        }, 1000);
      }
    });
  }
});
