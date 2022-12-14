const cardArea = document.getElementById("cardArea");
const searchBtnElement = document.getElementById("searchBtn");

searchBtnElement.addEventListener("click", searchHandler);

async function fetchData(url) {
    try {
        const res = await fetch(url, { method: 'GET', headers: { 'Access-Control-Allow-Origin': '*' } });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

function searchHandler() {
        const nrCards=1;
        cardArea.innerHTML = '';
        fetchData(`https://deckofcardsapi.com/api/deck/new/draw/?count=${nrCards}`)
            .then(data => {
                console.log(data)
                data.result && data.result.length > 0 ? searchOutput(data.cards) : console.log("nothing found");
            })
            .catch(err => console.error(err));
}

let searchOutput = (arr) => {
    arr.forEach(e => {
        console.log(e)
        createCards(e)
    });
}

let createCards = (data) => {
    let card = document.createElement('div');
    card.className = 'card shadow mb-3';

    let cardImg = document.createElement('img');
    cardImg.src = `${data.image}`;
    cardImg.className = 'card-img-top';
    cardImg.alt = data.properties.name;

    card.appendChild(cardImg);
    cardArea.appendChild(card);
}



