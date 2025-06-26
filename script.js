// Player's Starting Score
//let score = 0;
//let moleCount = 0;
//let gameRunning = false;

//const GAME_DURATION = 15000;
//const MIN_PEEP_TIME = 500;
//const MAX_PEEP_TIME = 1000;

// DOM SELECT ELEMENTS
const holes = document.querySelectorAll(".hole");
const scoreDisplay = document.getElementById("score");
const moleCountDisplay = document.getElementById("moleCount");
const startButton = document.getElementById("startButton");
const timerDisplay = document.getElementById("timer");
const gameOverMessage = document.getElementById("gameOverMessage");

// Add sound effect for whacking a mole
const popSound = new Audio("sounds/pop.mp3");

// Initialize game board by adding a mole to each hole
function initializeGame() {
  holes.forEach(function (hole) {
    // Create a new div for the mole
    const mole = document.createElement("div");
    mole.className = "mole";
    mole.textContent = "🦦"; // Use an emoji for the mole
    mole.style.fontSize = "2.5em";
    mole.style.display = "flex";
    mole.style.alignItems = "center";
    mole.style.justifyContent = "center";
    mole.style.background = "none";
    // Add the mole to the hole
    hole.appendChild(mole);
    // Add a click event to whack the mole
    mole.addEventListener("click", whack);
  });
}

// Whack function: called when a mole is clicked
function whack(event) {
  // Only allow whacking if the game is running
  if (!gameRunning) {
    return;
  }
  // Only allow whack if mole is up
  const mole = event.target;
  if (mole.parentNode.classList.contains("up")) {
    score++;
    scoreDisplay.textContent = score;
    mole.parentNode.classList.remove("up");
    // Play sound effect
    popSound.currentTime = 0;
    popSound.play();
  }
}

// Keyboard accessibility: qweasdzxc keys whack corresponding mole (1-9)
function handleKeydown(event) {
  if (!gameRunning) {
    return;
  }
  // Map qweasdzxc to 1-9
  const keyMap = {
    q: 0, // 1
    w: 1, // 2
    e: 2, // 3
    a: 3, // 4
    s: 4, // 5
    d: 5, // 6
    z: 6, // 7
    x: 7, // 8
    c: 8, // 9
  };
  const index = keyMap[event.key];
  if (index !== undefined) {
    const hole = holes[index];
    if (hole && hole.classList.contains("up")) {
      const mole = hole.querySelector(".mole");
      if (mole) {
        mole.click(); // Simulate click to whack
      }
    }
  }
}
document.addEventListener("keydown", handleKeydown);

startButton.addEventListener("click", startGame);
initializeGame();

// Timer logic and game over message
let timerInterval;
function startTimer() {
  let timeLeft = 15;
  if (timerDisplay) {
    timerDisplay.style.display = "inline"; // Make sure timer is visible
    timerDisplay.textContent = timeLeft;
  }
  timerInterval = setInterval(function () {
    timeLeft--;
    if (timerDisplay) {
      timerDisplay.textContent = timeLeft;
    }
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function showGameOver() {
  if (gameOverMessage) {
    gameOverMessage.textContent = `Game Over! Your score: ${score}`;
    gameOverMessage.style.display = "block";
  }
}
function hideGameOver() {
  if (gameOverMessage) {
    gameOverMessage.style.display = "none";
  }
}

// Patch startGame to add timer and game over
function startGame() {
  score = 0;
  moleCount = 0;
  gameRunning = true;
  scoreDisplay.textContent = score;
  moleCountDisplay.textContent = moleCount;
  startButton.disabled = true;
  hideGameOver();
  startTimer();
  if (typeof showMole === "function") {
    showMole();
  }
  setTimeout(function () {
    gameRunning = false;
    startButton.disabled = false;
    clearInterval(timerInterval);
    if (timerDisplay) {
      timerDisplay.textContent = "0";
    }
    showGameOver();
  }, 15000);
}
