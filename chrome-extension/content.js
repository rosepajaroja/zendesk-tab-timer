// content.js (Clean Rewritten)
const TIMER_MINUTES = 3;
const FLASH_INTERVAL_MS = 500;
const CHECK_INTERVAL_MS = 1000;

const timers = new Map();
const flashers = new Map();
let originalTitle = document.title;
let isFlashing = false;
let flashInterval = null;

function extractTicketIdFromUrl() {
  const match = window.location.pathname.match(/\/agent\/tickets\/(\d+)/);
  return match ? match[1] : null;
}

function getAllTabs() {
  return Array.from(document.querySelectorAll('[role="tab"][data-entity-id]'));
}

function ensureTimerDisplay(tab) {
  tab.style.height = '60px';
  tab.style.paddingTop = '3px';
  tab.style.paddingBottom = '3px';

  let timerEl = tab.querySelector(".zd-timer");
  if (!timerEl) {
    const subtitle = tab.querySelector('[data-test-id="header-tab-subtitle"]');
    if (subtitle) {
      timerEl = document.createElement("div");
      timerEl.className = "zd-timer";
      timerEl.style.cssText = "margin-top: 4px; font-size: 12px; font-family: Arial, sans-serif; font-weight: bold;";
      subtitle.appendChild(document.createElement("br"));
      subtitle.appendChild(timerEl);
    }
  }
  return timerEl;
}

function flashTab(tab) {
  const ticketId = tab.getAttribute("data-entity-id");
  if (flashers.has(ticketId)) return;

  let toggle = false;
  const interval = setInterval(() => {
    if (!document.body.contains(tab)) {
      clearInterval(interval);
      flashers.delete(ticketId);
      return;
    }
    tab.style.backgroundColor = toggle ? "#ff4d4d" : "";
    toggle = !toggle;
  }, FLASH_INTERVAL_MS);

  flashers.set(ticketId, interval);
  startFlashingTitle();
}

function stopFlashing(ticketId) {
  if (flashers.has(ticketId)) {
    clearInterval(flashers.get(ticketId));
    const tab = document.querySelector(`[role="tab"][data-entity-id="${ticketId}"]`);
    if (tab) tab.style.backgroundColor = "";
    flashers.delete(ticketId);
  }
  if (flashers.size === 0) stopFlashingTitle();
}

function startFlashingTitle() {
  if (isFlashing) return;
  isFlashing = true;
  flashInterval = setInterval(() => {
    document.title = document.title === "🔴 Zendesk Alert!" ? originalTitle : "🔴 Zendesk Alert!";
  }, FLASH_INTERVAL_MS);
}

function stopFlashingTitle() {
  clearInterval(flashInterval);
  document.title = originalTitle;
  isFlashing = false;
}

function startTimer(tab) {
  const ticketId = tab.getAttribute("data-entity-id");
  if (timers.has(ticketId)) return;

  const startTime = Date.now();
  timers.set(ticketId, { startTime });
  ensureTimerDisplay(tab);
}

function updateTimerDisplays() {
  const currentTicketId = extractTicketIdFromUrl();
  for (const [ticketId, data] of timers.entries()) {
    const tab = document.querySelector(`[role="tab"][data-entity-id="${ticketId}"]`);
    if (!tab) continue;
    const timerEl = tab.querySelector(".zd-timer");
    if (!timerEl) continue;

    const secondsElapsed = Math.floor((Date.now() - data.startTime) / 1000);
    const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
    const seconds = String(secondsElapsed % 60).padStart(2, '0');
    timerEl.textContent = `⏱ ${minutes}:${seconds}`;
    timerEl.style.color = parseInt(minutes) >= 12 ? 'red' : parseInt(minutes) >= 10 ? 'orange' : 'green';

    if (ticketId !== currentTicketId && secondsElapsed % (TIMER_MINUTES * 60) === 0) {
      flashTab(tab);
    }
  }
}

function monitorTabs() {
  const currentTicketId = extractTicketIdFromUrl();
  const tabs = getAllTabs();

  tabs.forEach(tab => {
    const tabId = tab.getAttribute("data-entity-id");
    ensureTimerDisplay(tab);

    if (tabId === currentTicketId) {
      stopFlashing(tabId);
    }
    if (!timers.has(tabId)) {
      startTimer(tab);
    }
  });
}

window.addEventListener("load", () => {
  setInterval(() => {
    monitorTabs();
    updateTimerDisplays();
  }, CHECK_INTERVAL_MS);
});