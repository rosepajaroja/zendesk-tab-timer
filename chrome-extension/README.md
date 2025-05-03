# Zendesk Inactive Tab Timer (Chrome Extension)

This Chrome Extension helps support agents stay on top of multiple Zendesk chats by visually alerting them when a ticket tab has been inactive for too long (default: 3 minutes).

---

## ✅ Features

- ⏱️ Tracks inactivity per open Zendesk ticket tab
- 🔴 Flashes the background of the inactive internal tab (red by default)
- 🧠 Flashes the browser tab title with “🔴 Zendesk Alert!”

---

## 🚀 How to Install

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (top right)
4. Click **“Load unpacked”**
5. Select the `chrome-extension/` folder

Once loaded, the extension will begin working automatically on any Zendesk tab.

---

## 🛠 Customization

You can edit `content.js` to tweak behavior:

- `TIMER_MINUTES`: Change the idle duration before a tab flashes (default: `3`)
- `tab.style.backgroundColor`: Customize the tab flash color
- `FLASH_INTERVAL_MS`: Adjust flash speed (default: `500ms`)
- Add or remove sound/alerts if needed

To modify the extension:
- Make your changes
- Go to `chrome://extensions`
- Click **“Reload”** under your extension

---

## 🧪 Known Limitations

- Flashes tabs only when the ticket tab is rendered (not from overflow menus)
- Sound has been removed due to autoplay restrictions, but can be re-added manually

---
