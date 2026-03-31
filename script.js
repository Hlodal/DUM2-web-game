const cardCount = 24
const cardContainer = document.querySelector("#cards-container")
let cards = []


let card = {
    id: 0, // 0 to (cardCount / 2) - 1
    first: true, // either true or false depending on the card type
    domElement: undefined,
    isFlipped: false
}
 
restartGame() 


function restartGame() {
    shuffleCards()
    dealCards()
}

function dealCards() {
    cards.forEach((card, id) => {
        // create a dom element and assign it
        let newCardElement = document.createElement("div")
        newCardElement.classList.add(id)
        newCardElement.innerHTML = id;
        newCardElement.addEventListener("click", function (e) {
            if (!this.isFlipped) {
                this.classList.add("flipped")
                this.isFlipped = true
            } else {
                this.classList.remove("flipped")
                this.isFlipped = false
            }
        })
        cardContainer.appendChild(newCardElement)
        card.domElement = newCardElement
    })
}

function shuffleCards() {
    for (let i = 0; i < cardCount-1; i++) {
        newCard = card
        newCard.id = i
        cards.forEach(card => {
           if (card.id == newCard.id) newCard.first = false
        })
        cards.push(newCard)
    }
}

function randomInt(i1, i2) {
    // let num = Math.random() * ???
    num = Math.floor(num)
    alert(num)
    return num
}