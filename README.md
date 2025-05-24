# 🧼 CleanerChatGPT

CleanerChatGPT is a lightweight Chrome extension that allows you to view, select, and delete multiple ChatGPT conversations with ease — using OpenAI’s official backend API.

## 🚀 Features

- 🔒 Secure token handling (automatic or manual)
- 🧾 Paginated fetching — retrieves your entire chat history
- ✅ Bulk selection & deletion of conversations
- 🧠 Clean UI integrated with ChatGPT’s style
- ⚙️ Chrome Manifest v3 compliant

## 🔧 Installation

1. Clone or download this repository.
2. Open `chrome://extensions` in your browser.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the extension folder.
5. Visit [https://chatgpt.com](https://chatgpt.com) and ensure you're logged in.

## 🛡️ Token Handling

- The extension automatically captures your `Bearer` token via background script or content script.
- If that fails, you can paste it manually in the input field.

## ❗ Important Notes

- Your token is stored locally and never sent anywhere.
- Deleting conversations is irreversible.
- This is not an official OpenAI product.

## 📄 License

MIT — use it, fork it, improve it.

---

Made with ❤️ by humans and LLMs.
