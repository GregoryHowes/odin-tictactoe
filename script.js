const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    //make functions available outside factory function
    return{getName, getSymbol};
}

const displayController = (() => {
    //get the DOM objects
    const boardGameDOM = document.querySelectorAll(".board-square");
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

//Module to store and manipulate game board internally
//with exposed functions to allow changes to board status
//and to return board status
const boardController = (() => {
    //create blank array to initialise board
    const gameBoardArray = [];
    for (i=0; i<=9; i++) {
        gameBoardArray.push(i);
    }

    //return the current board game status array
    const getBoard = () => {
		return gameBoardArray;
	};

    //make functions available outside of this module
    return{getBoard};

})();

//initial function to execute on page load
const enterPage = function () {
    displayController.renderBoard(boardController.getBoard());
}

enterPage();
const playerOne = Player("Greg", "X");
const playerTwo = Player("Computer", "O");
