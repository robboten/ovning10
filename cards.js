
let deckId = 'new';

//faster than innerHtml
const reset = () => {
    cardArea.textContent = '' ;
    deckText.innerText='';
    deckId='new';
};

const cardArea = document.getElementById("cardArea");
const drawBtnElement = document.getElementById("drawBtn");
const resetBtnElement = document.getElementById("resetBtn");
const deckText = document.getElementById("decktext");

drawBtnElement.addEventListener("click", cardHandler);
resetBtnElement.addEventListener("click", reset);

async function fetchJSON(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function newDeck() {
    const data = await fetchJSON(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    return data && data.deck_id ? data.deck_id : 'new';
};

async function getCard(deckId) {
    const nrCards = 1;
    const data = await fetchJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${nrCards}`);
    return data;
}

async function cardHandler() {
    try {
        if (deckId === 'new') {
            deckId = await newDeck();
            //newDeck = function () { };
        }
        const data = await getCard(deckId);

        if(data && data.cards.length > 0){
            deckText.innerText=`${data.remaining} cards remaining`;
            return searchOutput(data.cards);
        }
        console.log("nothing found");
    } catch (error) {
        console.error(error);
    }
}

const searchOutput = (arr) => {
    arr.map(e => {
        createCards(e)
    });
}

async function resize(e){
    const cardId=e.id;
    const deck=await fetchJSON(`https://deckofcardsapi.com/api/deck/${deckId}/return/?cards=${cardId}`)
    //const pile=await fetchJSON(`https://deckofcardsapi.com/api/deck/${deckId}/pile/scrap/add/?cards=${cardId}`)
    e.classList.toggle("hide");
    deckText.innerText=`${deck.remaining} cards remaining`;
}

const createCards = (data) => {
    let cardImg = document.createElement('img');
    cardImg.src = `${data.image}`;
    cardImg.alt = data.code;
    cardImg.className = 'card-image shadow';
    cardImg.id = data.code;
    cardImg.onclick = function() { resize(this); };

    cardArea.appendChild(cardImg);
}



