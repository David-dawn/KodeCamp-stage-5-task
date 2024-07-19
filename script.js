'use strict';
// Initial Setup
const player1Section = document.querySelector('.player--0');
const player2Section = document.querySelector('.player--1');
const player1TotalScore = document.getElementById('score--0');
const player2TotalScore = document.getElementById('score--1');
const player1CurrentScore = document.getElementById('current--0');
const player2CurrentScore = document.getElementById('current--1');
const diceImage = document.querySelector('.dice');
const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

// Initializing Game state
let totalScores, currentTurnScore, activePlayer, gameActive;

const initializeGame = function () {
  totalScores = [0, 0];
  currentTurnScore = 0;
  activePlayer = 0;
  gameActive = true;

  player1TotalScore.textContent = 0;
  player2TotalScore.textContent = 0;
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;

  diceImage.classList.add('hidden');
  player1Section.classList.remove('player--winner');
  player2Section.classList.remove('player--winner');
  player1Section.classList.add('player--active');
  player2Section.classList.remove('player--active');
};
initializeGame();

// Switching Players
const switchToNextPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentTurnScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1Section.classList.toggle('player--active');
  player2Section.classList.toggle('player--active');
};

// Rolling the Dice
rollDiceButton.addEventListener('click', function () {
  if (gameActive) {
    
    const dice = Math.trunc(Math.random() * 6) + 1;

    
    diceImage.classList.remove('hidden');
    diceImage.src = `dice-${dice}.png`;

   
    if (dice !== 1) {
      
      currentTurnScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentTurnScore;
    } else {
      
      switchToNextPlayer();
    }
  }
});

//Holding the score
holdButton.addEventListener('click', function () {
  if (gameActive) {
    
    totalScores[activePlayer] += currentTurnScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

   
    if (totalScores[activePlayer] >= 100) {
      
      gameActive = false;
      diceImage.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      
      switchToNextPlayer();
    }
  }
});

// Starting a New Game
newGameButton.addEventListener('click', initializeGame);
