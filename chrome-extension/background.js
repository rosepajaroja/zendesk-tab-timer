chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "notify") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "🔔 Zendesk Alert",
      message: `Ticket ${request.ticketId} has been inactive for too long.`
    });
  }
});