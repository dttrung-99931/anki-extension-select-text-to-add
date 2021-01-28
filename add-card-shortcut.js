function onTextSelection(e) {
    var selection = (document.all) ?
        document.selection.createRange().text :
        document.getSelection();

    if (selection != '' && selection != '\n') {
        chrome.runtime.sendMessage({ selectionText: selection + '' }, function (response) {
        });
    }
}

document.onmouseup = onTextSelection;

if (document.all) document.captureEvents(Event.MOUSEUP);

// "<all_urls>"
