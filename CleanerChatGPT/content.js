chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "clean") {
    for (const item of request.items) {
      const convLink = document.querySelector(`a[href='${item.elementId}']`);
      if (convLink) {
        convLink.click();
        await wait(1500);

        const deleteBtn = document.querySelector("button[aria-label='Delete conversation']");
        if (deleteBtn) {
          deleteBtn.click();
          await wait(500);

          const confirmBtn = document.querySelector("button.bg-red-600, button:has-text('Confirm')");
          if (confirmBtn) confirmBtn.click();
        }

        await wait(2000);
      }
    }
  }
});

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
