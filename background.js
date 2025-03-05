
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.webNavigation.onCompleted.addListener((details) => {
    if(details.frameId === 0) { // check main frame
        chrome.storage.local.get({vistedUrls: []}, (result) => {
            const visitedUrls = result.vistedUrls;
            visitedUrls.push(details.url);
            chrome.storage.local.set({vistedUrls});
        });
    }
}, {url: [{schemes: ['http', 'https']}]});






