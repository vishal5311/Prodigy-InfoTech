let currentPlayer = 'X';
let gameEnded = false;
const squares = document.querySelectorAll('.square');

// Add event listeners to squares
squares.forEach(square => {
    square.addEventListener('click', () => {
        if (!gameEnded && square.textContent === '') {
            square.textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                alert(`${currentPlayer} wins!`);
                gameEnded = true;
            } else if (checkDraw()) {
                alert('It\'s a draw!');
                gameEnded = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

function checkWin(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    return winningCombos.some(combo => {
        return combo.every(index => squares[index].textContent === player);
    });
}

function checkDraw() {
    return [...squares].every(square => square.textContent !== '');
}
