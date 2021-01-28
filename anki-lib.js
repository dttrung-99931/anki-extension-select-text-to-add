function generateDeckNameForNow(){
    date = new Date();
    components = date.toLocaleDateString().split('/');
    deckName = components[0] + 'd' + components[1];
    return deckName;
}

function ankiConnectRequest2(action, params, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8765');
    xhr.onload = () => {
        onSuccess(JSON.parse(xhr.responseText), xhr.status);
    }
    xhr.ontimeout = () => {
        onSuccess(xhr.status);
    }
    var version = 6;
    var sendData = JSON.stringify({
        action, version, params
    });

    xhr.send(sendData);
    // debugLog(sendData);
}


function createNotification(msg) {
    var manifestName;

    var manifestVersion;

    if (!isValidValue(manifestName)) {
        manifestName = "Custom anki";
    } else {
        manifestName = manifest.name;
    }

    if (!isValidValue(manifestVersion)) {
        manifestVersion = manifest.version;
    } else {
        manifestVersion = "1.00";

    }
    chrome.notifications.create(
        'Custom anki extension', {
        type: 'basic',
        iconUrl: 'icon-64.png',
        title: manifestName + ' ' + manifestVersion,
        message: msg
    },
        function () {

        }
    );

}
