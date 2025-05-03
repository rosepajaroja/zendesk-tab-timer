const TIMER_MINUTES = 3; //3 minutes waiting time
const FLASH_INTERVAL_MS = 500;
const CHECK_INTERVAL_MS = 1000;

const timers = new Map();
const flashers = new Map();
let originalTitle = document.title;
let isFlashing = false;
let flashInterval = null;
const sound = new Audio(chrome.runtime.getURL("open-up-587.mp3"));
sound.volume = 0.5;

function extractTicketIdFromUrl() {
  const match = window.location.pathname.match(/\/agent\/tickets\/(\d+)/);
  return match ? match[1] : null;
}

function getAllTabs() {
  return Array.from(document.querySelectorAll('[role="tab"][data-entity-id]'));
}

function flashTab(tab) {
  const ticketId = tab.getAttribute("data-entity-id");
  if (flashers.has(ticketId)) return;

  let toggle = false;
  const interval = setInterval(() => {
    if (!tab || !document.body.contains(tab)) {
      clearInterval(interval);
      flashers.delete(ticketId);
      return;
    }
    tab.style.backgroundColor = toggle ? "#ff4d4d" : "";
    toggle = !toggle;
  }, FLASH_INTERVAL_MS);

  flashers.set(ticketId, interval);
  notifyUser(ticketId);
  startFlashingTitle();
}

function notifyUser(ticketId) {
  chrome.runtime.sendMessage({ type: "notify", ticketId });
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

function stopFlashing(ticketId) {
  if (flashers.has(ticketId)) {
    clearInterval(flashers.get(ticketId));
    const tab = document.querySelector(`[role="tab"][data-entity-id="${ticketId}"]`);
    if (tab) tab.style.backgroundColor = "";
    flashers.delete(ticketId);
  }

  if (flashers.size === 0) {
    stopFlashingTitle();
  }
}

function startTimerForTab(tab) {
  const ticketId = tab.getAttribute("data-entity-id");
  if (timers.has(ticketId)) return;

  const timer = setTimeout(() => {
    flashTab(tab);
  }, TIMER_MINUTES * 60 * 1000);

  timers.set(ticketId, timer);
}

function resetTimerForTab(ticketId) {
  if (timers.has(ticketId)) {
    clearTimeout(timers.get(ticketId));
    timers.delete(ticketId);
  }
  stopFlashing(ticketId);
}

function monitorTabs() {
  const currentTicketId = extractTicketIdFromUrl();
  const tabs = getAllTabs();

  tabs.forEach(tab => {
    const tabId = tab.getAttribute("data-entity-id");

    if (tabId === currentTicketId) {
      resetTimerForTab(tabId);
    } else {
      startTimerForTab(tab);
    }
  });
}

window.addEventListener("load", () => {
  setInterval(monitorTabs, CHECK_INTERVAL_MS);
});
