//tic-tac-toc.js

// Representing the borad 
let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

// Check for the winner
function checkWinner(board){
    const winningStates = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]            // diagonals
    ];

    // for(i = 0; i < winningStates.length; i++){
    //     state = winningStates[i];
    // }
    for(let state of winningStates){
        const [a, b, c] = state; 
        if(board[a] != "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        )
        // board[a] will have "X" or "o" 
        return board[a];
    }

    return null;
}

// Handle player moves 
function handleMove(cellIndex){
    if(board[cellIndex] === ""){
        board[cellIndex] = currentPlayer;
    

    let winner = checkWinner(board);
    if(winner){        
        alert(winner + " has won!");
        renderBoard();
        // resetBoard();
        return;
    }

    // Check for tie
    if(!board.includes("")){        
        alert("It's a tie!");
        renderBoard();
        // resetBoard();
        return;
    }

    // switch players
    currentPlayer = (currentPlayer === "X") ? "o":"X";

    // if(currentPlayer === "X"){
    //     currentPlayer = "o";
    // }
    // else
    //     currentPlayer = "X";
    }
}

// Reset the board 
function resetBoard(){
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X"; 
    renderBoard();

}
// Game UI 
function renderBoard(){
    const gameBoardDiv = document.getElementById("gameBoard");
    gameBoardDiv.innerHTML = "" // clear old cells

    for(let i = 0; i < 9; i++){
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.setAttribute("id", i);

        // If the board cell is "X" or "o", 
        // add that as a class 
        if(board[i] === "X"){
            cellDiv.classList.add("X");
            cellDiv.textContent = "X";
        } else if (board[i] === "o"){
            cellDiv.classList.add("o");
            cellDiv.textContent = "o";
        } else {
            cellDiv.textContent = "";
        }

        // When clicked, handle the move
        cellDiv.addEventListener("click", function(){
            handleMove(i);
            renderBoard(); // render the board after the move
        });

        gameBoardDiv.appendChild(cellDiv);
    }
}

// Integration 
document.getElementById("resetButton").addEventListener("click", resetBoard);

// initial render on page load
renderBoard();