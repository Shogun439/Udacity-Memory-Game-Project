// Global declarations that will be used in the coming functions
let deck = document.getElementsByClassName("deck");
let card = document.getElementsByClassName("card");
let cards = Array.from([...card]);

let sec = 0;
let min = 0;
let timerLabel = document.getElementById("timerLabel");

let openedCards = [];
let matchedCards = [];

let count = 0;
let moveContainer = document.querySelector(".moves");
let moves = 0;
let stars = document.querySelector(".stars");
let star = document.querySelectorAll("li");
let playAgainBtn = document.querySelector(".playAgain")


let firstGuess, secondGuess;
let lockBoard = false;


function shuffleDeck() {
    const shuffledCards = shuffle(cards);
    for (card of shuffledCards) {
        deck[0].appendChild(card);
    }
}
shuffleDeck();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// added the once:true option, which starts the "stopWatch" (timer) function only once
deck[0].addEventListener("click", stopWatch, {
    once: true,
});

// The timer function
function stopWatch() {
    // the interval which the whole logic inside the "stopWatch" function applies is 1000ms 
    setInterval(() =>{
    // every 1000ms or every second the variable "sec" is incremented by one
    sec++
    
    // if the "matchedCards" length is 8, the game will be finished and the timer function will be closed
    if (matchedCards.length === 8) 
    return;
    
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (sec === 60) {
        min++;
        sec = 0;
    }
    // html manipulation through "innerHTML"
    timerLabel.innerHTML = `${min} : ${sec}`;
        }, 1000);
    }

// The Eventlistener, for every click on a card it activates the "displayCard" function
for (i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", displayCard);
}

function displayCard() {
    if (lockBoard) return;
    if (this === firstGuess) return;
    // gives new css properties for the clicked card, thus flipping the card open
    this.classList.toggle("open");
    this.classList.toggle("show");
    // for every flipped card it increments the "count" variable - important as every "move" equals 2 "count"
    count++;

    if (count === 1 ){
        firstGuess = this;
        // pushes the first selected card into the "openedCards" array, which is later compared with the second card 
        openedCards.push(this);
        return;
    }
    // if two cards are already selected, "lockBoard" will be changed to true which makes it impossible to open a third card
    else if (count === 2) {
        lockBoard = true;
        secondGuess = this;
        // secondCard is pushed into the "openedCards" array
        openedCards.push(this);
        // the functions are fired off in the following order:
        checkMatch();
        resetCount();
        moveCounter();
    }
};

// compares the first and second card 
function checkMatch() {
    let isMatch = openedCards[0].dataset.prop === openedCards[1].dataset.prop;
    // ternary operator: if it is a match the "matching" function will be used, else the "returnCards" function
        isMatch ? matching() : returnCards();
    }

// adds a class, to let the card permanently open 
function matching() {
    firstGuess.classList.add("match");
    secondGuess.classList.add("match");
    // all matched Cards are pushed into the "matchedCards" array, which is later needed to determine if the game is won
    matchedCards.push(this);
    gameOver();
    }
// count has to be reseted to determine how many cards are opened for every turn
function resetCount() {
    count = 0;
    // clears the "openedCards" array
    openedCards = [];
    returnCards();
}
// the noMatch class is added.
function returnCards() {
    firstGuess.classList.add("noMatch");
    secondGuess.classList.add("noMatch");
// closes the card again, "lockBoard" is set to false so the player is able again to open the cards
setTimeout(() => {
    firstGuess.classList.remove("show", "open");
    secondGuess.classList.remove("show", "open");
    firstGuess.classList.remove("noMatch");
    secondGuess.classList.remove("noMatch");

    lockBoard = false;
}, 800);
}
// increments the moves which is needed for the final score
function moveCounter() {
    moves++;
    moveContainer.innerHTML = moves;
    starRating();
}

function starRating() {
    if (moves === 10 ) {
        stars.removeChild(star[0]);
    }
    if (moves === 13 ) {
        stars.removeChild(star[1]);
    }
    if (moves === 16 ) {
        stars.removeChild(star[2]);
    }
    if (moves === 20 ) {
        stars.removeChild(star[3]);
    }
}

let modal = document.getElementById("modal");
let modalText = document.querySelector(".modalText");
// the final text message after clearing the memory card game
function gameOver() {
    setTimeout(() => {
    if (matchedCards.length === 8) {

    modal.style.display = "block";
    modalText.innerHTML = `Time:  ${min} : ${sec} |
    Moves:  ${moves} |
    Rating:  ${stars.childElementCount} |
    - LETS TRY A BETTER SCORE!`;
    }
}, 500);
}
