const board = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const winnerDisplay = document.getElementById('winners');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleClick(event) {
  const index = event.target.getAttribute('data-index');

  if (gameBoard[index] !== '' || !gameActive) return;

  gameBoard[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add(currentPlayer === 'X' ? 'x' : 'o');

  if (checkWinner()) {
    winnerDisplay.textContent = `${currentPlayer} победил!`;
    winnerDisplay.className = 'win';
    gameActive = false;
    resetButton.style.display = 'block';
    return;
  }

  if (isDraw()) {
    winnerDisplay.textContent = 'Ничья!';
    winnerDisplay.className = 'draw';
    gameActive = false;
    resetButton.style.display = 'block';
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
}

function isDraw() {
  return gameBoard.every(cell => cell !== '') && !checkWinner();
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  board.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
  winnerDisplay.textContent = '';
  winnerDisplay.className = '';
  resetButton.style.display = 'none';
}

board.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
