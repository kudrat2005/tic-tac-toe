// Stack to store moves
let moveStack = [];
let totalMatches = 0;

const turn = document.getElementById("turn");
const matches = document.getElementById("matches");
let scoreX = 0;
let scoreO = 0;

const popup = document.getElementById("winnerPopup");
const winnerText = document.getElementById("winnerText");
let currentPlayer = "X";
let gameOver = false;

let board = ["", "", "", "", "", "", "", "", ""];

const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {

    cell.addEventListener("click", () => {

        if(gameOver) return;

        const index = cell.dataset.index;

        if(board[index] !== "")
            return;

        board[index] = currentPlayer;
        cell.innerHTML = currentPlayer;
        moveStack.push({
        index: index,
        player: currentPlayer
});

        if(currentPlayer==="X"){
           cell.style.color="#ff1744";
           cell.style.textShadow="0 0 15px #ff1744";
        }
        else{
            cell.style.color="#2979ff";
             cell.style.textShadow="0 0 15px #2979ff";
        }

        if(checkWinner()){
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        status.innerHTML = "Player " + currentPlayer + "'s Turn";
        turn.innerHTML = currentPlayer;

    });

});

function checkWinner(){

    for(let combination of winningCombinations){

        let a = combination[0];
        let b = combination[1];
        let c = combination[2];

        if(
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ){

           status.innerHTML = "🎉 Player " + board[a] + " Wins!";

           winnerText.innerHTML = "🏆 Player " + board[a] + " Wins!";

          popup.classList.add("show");

           if(board[a]=="X"){
                  scoreX++;
           document.getElementById("scoreX").innerHTML=scoreX;
           }
           else{
                 scoreO++;
                 document.getElementById("scoreO").innerHTML=scoreO;
            }
            totalMatches++;
            matches.innerHTML = totalMatches;

            return true;
        }

    }

    return false;
}
const restartButton = document.getElementById("restart");

restartButton.addEventListener("click", restartGame);

function restartGame(){

    board = ["", "", "", "", "", "", "", "", ""];
    moveStack = [];

    currentPlayer = "X";
    turn.innerHTML = "X";

    gameOver = false;

    status.innerHTML = "Player X's Turn";

    popup.classList.remove("show");

    cells.forEach(cell => {

        cell.innerHTML = "";
        cell.style.pointerEvents = "auto";
        cell.style.color = "";
        cell.style.textShadow = "";

    });

}

function closePopup(){

    popup.style.display = "none";

    restartGame();

}
const undoButton = document.getElementById("undo");

undoButton.addEventListener("click", undoMove);

function undoMove(){

    if(moveStack.length === 0){
        return;
    }

    let lastMove = moveStack.pop();

    board[lastMove.index] = "";

    cells[lastMove.index].innerHTML = "";

    cells[lastMove.index].style.color = "";
    cells[lastMove.index].style.textShadow = "";

    currentPlayer = lastMove.player;

    status.innerHTML = "Player " + currentPlayer + "'s Turn";

    gameOver = false;
}