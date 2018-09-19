/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976


let card = document.getElementsByClassName("card");
let cards = [...card];
let cardsu = Array.from(cards);
let openedCards = [];
let matchedCards = [];
let count = 0;
let moveContainer = document.querySelector(".moves");
let moves = 0;
let stars = document.querySelector(".stars");
let star = document.getElementsByTagName("li");
let firstGuess, secondGuess;
let lockBoard = false;

function shuffle(cardsu) {
    var currentIndex = cardsu.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardsu[currentIndex];
        cardsu[currentIndex] = cardsu[randomIndex];
        cardsu[randomIndex] = temporaryValue;
    }
    return cardsu;
}

for (i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", displayCard);
}

function displayCard() {
    if (lockBoard) return;
    if (this === firstGuess) return;
    this.classList.toggle("open");
    this.classList.toggle("show");
    count++;

    if (count === 1 ){
        firstGuess = this;

        openedCards.push(this);
        return;
    }
    else if (count === 2) {
        lockBoard = true;
        secondGuess = this;
        openedCards.push(this);

        checkMatch();
        resetCount();
        moveCounter();
    }
};

function checkMatch() {


    let isMatch = openedCards[0].dataset.prop === openedCards[1].dataset.prop;
        isMatch ? matching() : returnCards();
    }

function matching() {
    firstGuess.classList.add("match");
    secondGuess.classList.add("match");

    matchedCards.push(this);
    gameOver();

}

function resetCount() {
    count = 0;
    openedCards = [];
    returnCards();
}

function returnCards() {
setTimeout(() => {
    firstGuess.classList.remove("show", "open");
    secondGuess.classList.remove("show", "open");

    lockBoard = false;
}, 1500);
}

function moveCounter() {
    moves++;
    moveContainer.innerHTML = moves;
    starRating();
}

function starRating() {
    if (moves === 9 ) {
        stars.removeChild(star[0]);
    }
    else if (moves === 14 ) {
        stars.removeChild(star[0]);
    }
}

function gameOver() {
    setTimeout(() => {
    if (matchedCards.length === 8) {
        window.alert(`Congratulations! You only needed ${moves} moves to win!`);
    }
}, 1000);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
