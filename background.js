chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId === 0) { // check main frame
    const url = new URL(details.url);
    const hostname = url.hostname;

    chrome.storage.local.get({ visitedUrls: {} }, (result) => {
      let visitedUrls = result.visitedUrls || {};
      if (visitedUrls[hostname]) {
        visitedUrls[hostname]++;
      } else {
        visitedUrls[hostname] = 1;
      }
      chrome.storage.local.set({ visitedUrls });
    });
  }
}, { url: [{ schemes: ['http', 'https'] }] });

console.log("DeepTrace Tracking started...");