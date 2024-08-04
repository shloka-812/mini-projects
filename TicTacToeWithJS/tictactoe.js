const prompt = require('prompt-sync')();
let board = [" "," "," "," "," "," "," "," "," "];
let currentPlayer = "X";
let statusOfGame = true;

function printBoard() {
    console.log(`
    ${board[0]} | ${board[1]} | ${board[2]}
    ---------
    ${board[3]} | ${board[4]} | ${board[5]}
    ---------
    ${board[6]} | ${board[7]} | ${board[8]}
  `);
}

function handleTurn(position) {
    console.log(position);
    if(board[position] === " ")
    {
        board[position] = currentPlayer;
    } else{
        console.log("choose another position");
        return false;
    }

    if(checkIfWon()) {
        printBoard();
        console.log(`Player ${currentPlayer} wins!`);
        statusOfGame = false;
        return true;
    }
    
    if(board.every(cell => cell !== " ")) {
        printBoard();
        console.log(`Match draw!`);
        statusOfGame = false;
        return true;
    }

    currentPlayer = currentPlayer == "X" ? "O" : "X";
    return true;
}

function checkIfWon(){
    winningPositions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [1,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    return winningPositions.some(condition => {
        const [a,b,c] = condition;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer
    });
}

while(statusOfGame) {
    printBoard();
    const position = prompt(`Player ${currentPlayer}, enter your position(0-8): `);
    if(position<0 || position>8) {
        console.log("invalid postion number, enter between 0 to 8");
    } else {
        handleTurn(position);
    }

}
