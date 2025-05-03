# Zendesk Inactive Tab Timer (Tampermonkey Version)

This is a lightweight [Tampermonkey](https://www.tampermonkey.net/) userscript that helps Zendesk agents keep track of multiple open chats. It flashes the Zendesk internal ticket tab when it has been inactive for a set time (default: 3 minutes).

---

## ✅ Features

- Flashes the background of the inactive internal ticket tab (red by default)
- Browser tab title flashes as `🔴 Zendesk Alert!` to draw attention
- Keeps timers per ticket tab open in the Zendesk Agent Workspace
- Lightweight and self-contained (no external libraries)

---

## 🛠 Customization

You can edit the script to change:

- `TIMER_MINUTES`: Adjust how long a tab must be inactive before flashing
- `tab.style.backgroundColor`: Customize the flash color
- `FLASH_INTERVAL_MS`: Speed of the flash animation

---

## 🚀 How to Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) if you haven’t already
2. Open the Tampermonkey dashboard and click **“Create a new script”**
3. Replace the placeholder code with [this file](./zendesk-tab-timer.user.js)
4. Save
5. Refresh your Zendesk dashboard

That’s it — the script will begin monitoring your tabs as you open tickets.
