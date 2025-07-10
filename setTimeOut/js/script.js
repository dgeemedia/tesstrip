const countdownDisplay = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const customTime = document.getElementById('customTime');

let timeLeft = 10;
let intervalId = null;
let isPaused = false;

function updateDisplay() {
  countdownDisplay.textContent = timeLeft > 0 ? timeLeft : "Time's up!";
}

startButton.addEventListener('click', () => {
  if (customTime.value) {
    timeLeft = parseInt(customTime.value);
  }

  if (intervalId === null) {
    intervalId = setInterval(() => {
      if (!isPaused && timeLeft > 0) {
        timeLeft--;
        updateDisplay();
        if (timeLeft === 0) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }
    }, 1000);
  }
});

pauseButton.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
});

resetButton.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  timeLeft = customTime.value ? parseInt(customTime.value) : 10;
  updateDisplay();
  isPaused = false;
  pauseButton.textContent = 'Pause';
});

// Initial display
updateDisplay();
