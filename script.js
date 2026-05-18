const cardCount = 48
const cardContainer = document.querySelector("#cards-container")
let cards = []
let foundCardsCount = 0;

let selectedCards = [];
let lockBoard = false;


let card = {
    id: 0, // 0 to (cardCount / 2) - 1
    first: true, // either true or false depending on the card type
    domElement: undefined,
    isFlipped: false
}
 
restartGame() 


function restartGame() {
    cards = [];
    shuffleCards()
    dealCards()
}

function dealCards() {
    cardContainer.innerHTML = ""; // Clear previous

    cards.forEach((card) => {
        
        // create a dom element and assign it
        let newCardElement = createCardElement(card);
        newCardElement.cardData = card;
        
        // Add event listener for each card to be able to pick it up
        newCardElement.addEventListener("click", function (e) {
            handleCardClick(this.cardData);
        })

        card.domElement = newCardElement
        cardContainer.appendChild(newCardElement)
    })
}

function shuffleCards() {
    for (let i = 0; i < cardCount; i++) {
        let newCard = { ...card };
        newCard.id = Math.floor(i/2)
        cards.forEach(card => {
           if (card.id == newCard.id) newCard.first = false
        })
        cards.push(newCard)
        cards = cards.sort(() => Math.random() - 0.5)
    }
}

function createCardElement(card) {
    const newCardElement = document.createElement("div")
    newCardElement.classList.add(card.id)
    
    const inner = document.createElement("div")
    inner.classList.add("card-inner")

    const front = document.createElement("div")
    front.classList.add("card-front")
    url = `./cards/${card.id + 1}.png`
    front.style.backgroundImage = `url(${url})`;

    const back = document.createElement("div")
    back.classList.add("card-back")

    inner.appendChild(front)
    inner.appendChild(back)
    newCardElement.appendChild(inner)


    return newCardElement
}

function flipCard(card) {
    if (card.isFlipped) return;
    card.isFlipped = true;
    card.domElement.classList.add("flipped");
}

function randomInt(i1, i2) {
    // let num = Math.random() * ???
    num = Math.floor(num)
    alert(num)
    return num
}

function handleCardClick(card) {

    if (lockBoard) return;
    if (card.isFlipped) return;

    flipCard(card);

    selectedCards.push(card);

    if (selectedCards.length < 2) return;

    const card1 = selectedCards[0];
    const card2 = selectedCards[1];

    // prevent spam clicking during animation
    lockBoard = true;

    if (card1.id == card2.id) {

        // MATCH
        setTimeout(() => {
            foundCardsCount += 2;
            layDownFoundCard(card1)
            layDownFoundCard(card2)
            
            selectedCards = [];
            lockBoard = false;

            if (foundCardsCount >= cardCount) {
                lockBoard = true;
                setTimeout(() => {
                    cards.forEach((card) => {
                        resetCard(card);
                    })
                    setTimeout(() => {
                        lockBoard = false;
                        restartGame();
                    }, 1000);
                }, 1000);
            }
        }, 1000);
    } else {

        // NOT MATCH
        setTimeout(() => {

            unflipCard(card1);
            unflipCard(card2);

            selectedCards = [];
            lockBoard = false;

        }, 1000);
    }
}

function unflipCard(card) {
    card.isFlipped = false;
    card.domElement.classList.remove("flipped");
}


function layDownFoundCard(card) {
    card.domElement.classList.remove("flipped");
    card.domElement.classList.add("found");
}

function resetCard(card) {
    card.domElement.classList.remove("found");
}