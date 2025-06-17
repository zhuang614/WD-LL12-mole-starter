let score = 0;

// DOM SELECT ELEMENTS
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const moleCountDisplay = document.getElementById('moleCount');
const startButton = document.getElementById('startButton');

// Initialize game board by adding a "mole" element within each hole
function initializeGame() {
  holes.forEach((hole) => {
    const mole = document.createElement('div');
    mole.className = 'mole';
    hole.appendChild(mole);
    hole.addEventListener('click', whack);
  });
}

// Handle whacking a mole
function whack(e) {
  if (!e.isTrusted) return; // Prevent fake events

  const targetHole = e.currentTarget;
  if (!targetHole.classList.contains('up')) return;
  score++;
  targetHole.classList.remove('up');
  scoreDisplay.textContent = score;
}

// Event listeners
startButton.addEventListener('click', startGame);

// Initialize the game when loaded
initializeGame();


