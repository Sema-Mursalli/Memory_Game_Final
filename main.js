const gameBoard = document.querySelector('.game-board');
const startRestartButton = document.getElementById('start-restart');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let cards = [];
let flippedCards = [];
let matchedCards = [];
let score = 0;
let timer;
let timeLeft = 120;
let gameStarted = false;

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert('Game over! Time is out.');
      restartGame();
    }
  }, 1000);
}

function createGameBoard() {
  const pictures = ["pic1.jpg","pic2.jpg","pic4.jpg","pic5.jpg","pic6.jpg","pic8.jpg","pic9.jpg","pic10.jpg"];
  const shuffledValues = [...pictures, ...pictures].sort(() => Math.random() - 0.5);

  shuffledValues.forEach((value) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    const img = document.createElement('img');
    img.src = 'picpic.webp'; 
    card.appendChild(img);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
    cards.push(card);
  });
}

function flipCard() {
  if (!gameStarted) return; 
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    const img = this.querySelector('img');
    img.src = this.dataset.value; 
    img.style.width = '90px'; 
    img.style.height = '90px'; 
    img.style.borderRadius = '10px';
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
        matchedCards.push(...flippedCards);
        flippedCards = [];
        score++;
        scoreDisplay.textContent = score;

        if (matchedCards.length === cards.length) {
          clearInterval(timer);
          alert('Congratulations! You won the game!');
        }
      } else {
        setTimeout(() => {
          flippedCards.forEach(card => {
            card.classList.remove('flipped');
            card.querySelector('img').src = 'picpic.webp'; 
            card.querySelector('img').style.width = ''; 
            card.querySelector('img').style.height = ''; 
          });
          flippedCards = [];
        }, 1000);
      }
    }
  }
}

function restartGame() {
  clearInterval(timer);
  gameBoard.innerHTML = '';
  cards = [];
  flippedCards = [];
  matchedCards = [];
  score = 0;
  timeLeft = 120; 
  scoreDisplay.textContent = score;
  timerDisplay.textContent = '2:00'; 
  startRestartButton.textContent = 'Start the Game';
  gameStarted = false;
}

startRestartButton.addEventListener('click', () => {
  if (!gameStarted) {
    gameStarted = true;
    startRestartButton.textContent = 'Restart the Game';
    createGameBoard();
    startTimer();
  } else {
    restartGame();
  }
});
