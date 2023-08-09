const renderBoardGame = function (gameArray) {
    //get the DOM objects
    const boardGameDOM = document.querySelectorAll(".board-square");
    //copy the contents of gameAray object passed in as a parameter onto the board DOM
    for(i=0; i<=8; i++) {
        let boardSquare = boardGameDOM[i];
        boardSquare.innerHTML = gameArray[i];
    }

    /* let x=0;
    boardGameDOM.forEach((square) => {
        square.innerHTML = x;
        x++
    }); */


}


//Module to store game board internally, and provide a function to return it
const gameBoard = (() => {
    //create blank array to initialise board
    const gameBoardArray = [];
    for (i=0; i<=9; i++) {
        gameBoardArray.push(i);
    }

    const getBoard = () => {
		return gameBoardArray;
	};

    //make functions available outside of this module
    return{getBoard};

})();

renderBoardGame(gameBoard.getBoard());