'use strict';
// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const points0El = document.querySelector('#points--0');
const points1El = document.querySelector('#points--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

let points, currentPoints, activePlayer, playing;
// starting condition
const init = function () {
  points = [0, 0];
  currentPoints = 0;
  activePlayer = 0;
  playing = true;

  points0El.textContent = 0;
  points1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// Switching Player function
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentPoints = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling the functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate a random dice number/roll
    let number = Math.trunc(Math.random() * 6) + 1;
    //display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${number}.png`;
    // Checked if it is rolled 1 or not
    if (number !== 1) {
      // add dice to current points of active player
      currentPoints += number;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentPoints;
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});
// Holding Button Functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current points to the active playe's points
    points[activePlayer] = points[activePlayer] + currentPoints;
    document.querySelector(`#points--${activePlayer}`).textContent =
      points[activePlayer];
    // Checking if player's points is less than 100
    if (points[activePlayer] >= 100) {
      //Finish the Game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});
// Restart Button Functionality
btnNew.addEventListener('click', init);
