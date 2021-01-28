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
        }, onWindowCreated);
    });

}

function onWindowCreated(window) {
    // register focus window changed to close the window on unfocus
    chrome.windows.onFocusChanged.addListener((newActiveWindowID) => {
        if (window.id != newActiveWindowID) {
            chrome.runtime.sendMessage({ closeWindow: true }, function (response) {
            });
        }
    })
}

// Listen open addCard window event from ad-card-shortcut (in content_scirpts)
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.selectionText) {
            openAnkiPopupAdder(request)
        }
    }
);

// chrome.contextMenus.create({
//     title: "Add '%s' to anki",
//     contexts: ["selection"],
//     onclick: openAnkiPopupAdder
// });

