const status = document.getElementById('status');
let currentPlayer = 'X';
let difficulty = document.getElementById('input').value;
let board = [];
let gameOver = false;
const gameBoard = document.getElementById('game-board');
setupGame();
function setupGame() {
    gameOver = false;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    board = [];
    difficulty = document.getElementById('input').value;
    createBoard();
    renderBoard();
    gameBoard.style.setProperty('grid-template-columns', `repeat(${difficulty}, 1fr)`);
}

function createBoard() {
    board = [];
    for (let i = 0; i < difficulty; i++) {
        board[i] = [];
        for (let j = 0; j < difficulty; j++) {
            board[i][j] = "";
        }
    }
}

function renderBoard() {
    gameBoard.innerHTML = '';

    for (let i = 0; i < difficulty; i++) {
        for (let j = 0; j < difficulty; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.textContent = board[i][j];
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    if (gameOver) {
        return;
    }
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (board[row][col] === "") {
        board[row][col] = currentPlayer;
        renderBoard();
        if(difficulty<=5){
            if (checkWinner()) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }else{
            if (checkWinnerInRegion()) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }
}


function checkWinner() {
    const n = board.length;

    for (let i = 0; i < n; i++) {
        if (
            board[i].every(cell => cell === currentPlayer) ||
            board.every(row => row[i] === currentPlayer)
        ) {
            return true;
        }
    }

    if (
        board.every((row, index) => row[index] === currentPlayer) ||
        board.every((row, index) => row[n - index - 1] === currentPlayer)
    ) {
        return true;
    }

    return false;
}



function checkWinnerInRegion() {
for (let i = 0; i < difficulty; i++) {
for (let j = 0; j <= difficulty - 5; j++) {
    if (board[i].slice(j, j + 5).every(cell => cell === currentPlayer)) {
        return true;
    }
}
}
for (let i = 0; i < difficulty; i++) {
for (let j = 0; j <= difficulty - 5; j++) {
    if (board.slice(j, j + 5).every(row => row[i] === currentPlayer)) {
        return true;
    }
}
}
for (let i = 0; i <= difficulty - 5; i++) {
for (let j = 0; j <= difficulty - 5; j++) {
    if (board.slice(i, i + 5).every((row, index) => row[j + index] === currentPlayer)) {
        return true;
    }
}
}
for (let i = 0; i <= difficulty - 5; i++) {
for (let j = difficulty - 1; j >= 4; j--) {
    if (board.slice(i, i + 5).every((row, index) => row[j - index] === currentPlayer)) {
        return true;
    }
}
}
return false;
}
