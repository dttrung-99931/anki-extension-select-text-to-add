
function openAnkiPopupAdder(info) {
    frontCardContent = info.selectionText;
    let url = 'add-popup.html' + '?front-card-content=' + frontCardContent;
    chrome.tabs.create({
        url: chrome.extension.getURL(url),
        active: false
    }, function (tab) {
        // After the tab has been created, open a window to inject the tab
        chrome.windows.create({
            tabId: tab.id,
            type: 'popup',
            focused: true
        });
    });
}

// chrome.contextMenus.create({
//     title: "Add '%s' to anki",
//     contexts: ["selection"],
//     onclick: openAnkiPopupAdder
// });

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.selectionText) {
            openAnkiPopupAdder(request)
        }
    }
);