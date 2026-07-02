//your JS code here. If required.
const submit = document.getElementById("submit");
const game = document.getElementById("game");
const form = document.getElementById("player-form");
const message = document.querySelector(".message");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let board = Array(9).fill("");
let gameOver = false;

submit.addEventListener("click", () => {
    player1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;

    if (player1 === "" || player2 === "") return;

    form.style.display = "none";
    game.style.display = "block";

    currentPlayer = player1;
    currentSymbol = "X";
    message.textContent = `${currentPlayer}, you're up`;
});

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
    cell.addEventListener("click", function () {

        if (gameOver || this.textContent !== "") return;

        this.textContent = currentSymbol;
        board[Number(this.id) - 1] = currentSymbol;

        if (checkWinner()) {
            message.textContent = `${currentPlayer} congratulations you won!`;
            gameOver = true;
            return;
        }

        if (board.every(c => c !== "")) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        if (currentPlayer === player1) {
            currentPlayer = player2;
            currentSymbol = "o";
        } else {
            currentPlayer = player1;
            currentSymbol = "x";
        }

        message.textContent = `${currentPlayer}, you're up`;
    });
});

function checkWinner() {
    const win = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return win.some(([a,b,c]) =>
        board[a] &&
        board[a] === board[b] &&
        board[b] === board[c]
    );
}