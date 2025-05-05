# Zendesk Tab Timer

A productivity-boosting tool for Zendesk to improve handling time. 

---

## 💡 What It Does

- ⏱ Shows a visible timer on each open Zendesk ticket tab
- 🎨 Timer color changes from green → yellow (10 min) → red (12 min+)
- 🔁 Flashes inactive tabs every 3 minutes to alert you
- 🔔 Browser tab title alert if you're viewing other tabs or windows
- 🛑 Flashing resets when you focus on the ticket tab again

---

## 🔀 Versions

### Chrome Extension

📂 [chrome-extension/](./chrome-extension)

### Tampermonkey Script

📂 [tampermonkey/](./tampermonkey)

---

## 📥 Installation Instructions

### Chrome Extension
- Download or clone the repo
- Go to `chrome://extensions` in your browser
- Enable **Developer Mode**
- Click **Load unpacked** and select the `chrome-extension` folder

### Tampermonkey Script
- Install the [Tampermonkey extension](https://www.tampermonkey.net/)
- Create a new user script
- Paste in the contents of `zendesk-tab-timer.user.js`
- Save and refresh your Zendesk workspace

---

## 🛠 Customization

Inside the code, you can tweak:

```js
const TIMER_MINUTES = 3;           // Inactivity before flashing
const FLASH_INTERVAL_MS = 500;     // Speed of tab flashing
const CHECK_INTERVAL_MS = 1000;    // Timer update frequency
```

---

## 📄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for full version history.

