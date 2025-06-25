// Player's Starting Score
let score = 0;
let moleCount = 0;
let gameRunning = false;

const GAME_DURATION = 15000;
const MIN_PEEP_TIME = 500;
const MAX_PEEP_TIME = 1000;


// DOM SELECT ELEMENTS
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const moleCountDisplay = document.getElementById('moleCount');
const startButton = document.getElementById('startButton');

// Initialize game board
function initializeGame() {
  holes.forEach((hole) => {
    const mole = document.createElement('div');
    mole.className = 'mole';
    hole.appendChild(mole);
    hole.addEventListener('click', whack);
  });
}

startButton.addEventListener('click', startGame);
initializeGame();
