const cardArea = document.getElementById("cardArea");
const searchBtnElement = document.getElementById("searchBtn");
const searchInputElement = document.getElementById("searchInput");
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
    if (searchInputElement.value !== "") {
        var name = searchInputElement.value;
        cardArea.innerHTML = '';
        fetchData(`https://www.swapi.tech/api/people/?name=${name}`)
            .then(data => {
                console.log(data)
                data.result && data.result.length > 0 ? searchOutput(data.result) : console.log("nothing found");
            })
            .catch(err => console.error(err));
    }
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
    cardImg.src = `https://starwars-visualguide.com/assets/img/characters/${data.uid}.jpg`;
    cardImg.className = 'card-img-top';
    cardImg.alt = data.properties.name;

    let cardTitle = document.createElement('h4');
    cardTitle.innerText = data.properties.name;
    cardTitle.className = 'card-title';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let cardText = document.createElement('p');
    cardText.className = 'card-text';

    var props = data.properties;

    const keep = ['height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender']
    const result = Object.fromEntries(Object.entries(props).filter(([k]) => keep.includes(k)))

    for (var key in result) {
        keyStr=key;
        console.log(keyStr);
        cardText.innerHTML += `<span class="propkey">${keyStr.replaceAll('_',' ')}</span>: ${props[key]}<br />`;
    }

    card.appendChild(cardImg);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardArea.appendChild(card);
}



