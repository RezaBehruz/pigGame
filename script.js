'use strict';

// Accessing DOM Elements and initializing to Variable

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');

// declaring Variables
let scores, currentScore, activePlayer, playing;

// create the start function
let start = function () {
  // set all Variables to default 0
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  // set Player's Scores to 0
  score0El.textContent = 0;
  score1El.textContent = 0;

  // set Player's Current Score to 0
  current0El.textContent = 0;
  current1El.textContent = 0;

  // add the hidden class to the dice
  diceEl.classList.add('hidden');

  // set the Style Classes
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
};

start();

// create the SwitchPlayer function
const switchPlayer = function () {
  // set current scores to 0
  currentScore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // toggling style of players
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  // switch the active Player
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// Dice Roll Button

btnRoll.addEventListener('click', function () {
  if (playing) {
    // create a random Number
    let dice = Math.trunc(Math.random() * 6) + 1;

    // select the image
    diceEl.src = `dice-${dice}.png`;

    // show the dice Element
    diceEl.classList.remove('hidden');

    // apply the rule of Game
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch the Player.
      switchPlayer();
    }
  }
});

// Hold Button

btnHold.addEventListener('click', function () {
  if (playing) {
    // add Current Score to total score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // wins, when total Score is 100 or more

    if (scores[activePlayer] >= 100) {
      const winner = document.querySelector(`.player--${activePlayer}`);
      winner.classList.add('player--winner');
      winner.classList.remove('player--active');

      diceEl.classList.add('hidden');

      playing = false;
    } else {
      switchPlayer();
    }
  }
});

// New Game Button

btnNew.addEventListener('click', start);
