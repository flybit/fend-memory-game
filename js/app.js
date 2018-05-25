// Types of cards
const cardTypes = ['fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-bomb', 'fa-cube', 'fa-diamond', 'fa-leaf', 'fa-paper-plane-o'];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Create the li element for each card and
// append it to the parent element
function createCard(type, parentElement) {
    const li = document.createElement('li');
    li.classList.add('card');
    const childEl = document.createElement('i');
    childEl.classList.add('fa', type);
    li.appendChild(childEl);
    parentElement.appendChild(li);
}

// Create the deck of cards
function createDeck() {
    // Create the ul element and add 'deck' class
    const ul = document.createElement('ul');
    ul.classList.add('deck');

    // Prep a fresh flat list of cards (shuffled and duplicated)
    const cards = shuffle([...cardTypes, ...cardTypes]);

    // Add a li element for each card under the ul element
    cards.forEach(c => createCard(c, ul));

    // Append it to the container div
    const container = document.querySelector('div.container');
    container.appendChild(ul);

    return ul;
}

const moves = (function() {
    // Private members
    let moves = 0;
    const domElement = document.querySelector('.moves');

    function render() {
        domElement.textContent = moves;
    }

    return {
        increment() {
            ++moves;
            render();
        },
        reset() {
            moves = 0;
            render();
        },
        get() {
            return moves;
        }
    };
})();

// Click handler
function clickHandler(e) {
    const c = e.target;
    if (c.nodeName !== 'LI') {
        return;
    }
    // Return early if this card is already matched
    if (c.classList.contains('match')) {
        return;
    }
    // Return early if this cars if already opened
    if (c.classList.contains('show')) {
        return;
    }
    // Increment moves
    moves.increment();
    // Open this card
    c.classList.add('open', 'show');
}

// match, open show

function main() {
    // Create the deck
    const deck = createDeck();
    // Reset the moves counter
    moves.reset();
    deck.addEventListener('click', clickHandler);
}

main();


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
