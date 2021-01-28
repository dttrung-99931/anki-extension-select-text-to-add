var frontInput, backInput, deckInput, addButton;

document.addEventListener('DOMContentLoaded', () => {
    setup();
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.closeWindow) {
            window.close();
        }
    }
);

function setup(){
    frontInput = document.getElementById('front-card-input');
    backInput = document.getElementById('back-card-input');
    deckInput = document.getElementById('deck-input');
    addButton = document.getElementById('add-button');
    
    deckInput.value = generateDeckNameForNow();
    frontInput.value = getQueryParam('front-card-content');

    addButton.addEventListener("click", addCard); 
}

function getQueryParam(key){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

var numOfTimeAddCard = 0;
function addCard() {
    let currentDeck = deckInput.value;
    let currentNoteType = "Basic";
    let currentTags = [];

    let arrayToSend = {
        "Front": frontInput.value,
        "Back": backInput.value
    };

    let params = {
        "note": {
            "deckName": currentDeck,
            "modelName": currentNoteType,
            "fields": arrayToSend,
            "tags": currentTags
        }
    };

    let onSuccessRes = (res, statusCode) => {
        if (res.error == null){
            window.close();
            return;
        } 
        
        if (numOfTimeAddCard > 1){
            alert("2 Times Failed to add");
            return;
        }
        
        if (res.error.includes("deck was not found")){
            numOfTimeAddCard++;
            createDeck(
                deckInput.value, () => {
                    ankiConnectRequest2("addNote", params, onSuccessRes, onError)
                }, () => {
                    alert("Error create deck with name " + deckInput.value);
                }
            );
        } else alert(res.error + JSON.stringify(params));
    };

    let onError = statusCode => {
        alert('error ' + statusCode);
    }

    ankiConnectRequest2("addNote", params, onSuccessRes, onError);
}

function createDeck(deckName, onDeckCreated, onError){
    let param = {
        deck: deckName
    };
    ankiConnectRequest2("createDeck", param, 
        (res, code) => {
            if (res.error === null){
                onDeckCreated();
            } else alert(res.error);
    })    
}