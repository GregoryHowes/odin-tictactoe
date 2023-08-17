const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    //make functions available outside factory function
    return{getName, getSymbol};
}


const test = function(square) {
    console.log(square);
}

//Module to store and manipulate game board internally
//with exposed functions to allow changes to board status
//and to return board status
const gameBoard = (() => {
    //create blank array to initialise board
    let gameBoardArray = [];
    let currentPlayer = "";

    const initialiseGameBoard = () => {    
        gameBoardArray = [];
        for (i=0; i<=9; i++) {        
            gameBoardArray.push(i);
        }
    };

    //function to start new game
    const newGame = () => {
        initialiseGameBoard();
        displayController.renderBoard(getBoardStatus());
    }

    //return the current board game status array
    const getBoardStatus = () => {
		return gameBoardArray;
	};

    //make functions available outside of this module
    return{newGame, getBoardStatus};

})();


//Module (i.e. runs upon page load) to provide
// all functions necessary for displaying the board
// including getting the DOM objects and adding listeners
// and a returned function to (re)draw the board on the windows
const displayController = (() => {
    //get the DOM objects
    const boardGameDOM = document.querySelectorAll(".board-square");

    //add listener events for buttons
    const newGameButon = document.querySelector("#new-game");
    newGameButon.addEventListener("click", gameBoard.newGame);
    
    //add listener events for squares on the board
    boardGameDOM.forEach((square) => {
        square.addEventListener("click", test);
    });

    //copy the contents of gameAray object passed in as a parameter onto the board DOM
    const renderBoard = (gameArray) => {
        for(i=0; i<=8; i++) {
            /*
                0 1 2
                3 4 5
                6 7 8
            */
            let boardSquare = boardGameDOM[i];
            boardSquare.innerHTML = gameArray[i];
        }
    };

    //make functions available outside of this module
    return{renderBoard};
})();



//initial function to execute on page load
const enterPage = function () {
    //gameBoard.initialiseGameBoard();
    //displayController.renderBoard(gameBoard.getBoardStatus());
    //displayController.addBoardListeners();
}


//code to execute on initial page load
enterPage();
const playerOne = Player("Greg", "X");
const playerTwo = Player("Computer", "O");
