const charCardTemplate = document.querySelector("[data-char-template]");
const charCardContainer = document.querySelector("[data-char-cards-container]");
const searchInputElement = document.getElementById("searchInput");
let chars = [];

searchInputElement.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    console.log(value)
    chars.forEach(char => {
        const isVisible = char.name.toLowerCase().includes(value)
        console.log(isVisible)
        char.element.classList.toggle("hide", !isVisible)
    })
});

fetch('./all.json')
    .then(res => res.json())
    .then(data => {
        let arr = data;
        chars = arr.map(char => {
            const card = charCardTemplate.content.cloneNode(true).children[0]
            const img = card.querySelector("[data-img]")
            img.src = `https://starwars-visualguide.com/assets/img/characters/${char.id}.jpg`
            const title = card.querySelector("[data-title]")
            title.textContent = char.name
            charCardContainer.append(card)

            return { name: char.name, id:char.id, element: card }
        });

    })
    .catch(err => console.error(err));