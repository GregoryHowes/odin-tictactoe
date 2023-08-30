const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    //make functions available outside factory function
    return{getName, getSymbol};
}


const test = function(square) {
    console.log(square);
    square.srcElement.innerHTML = "X";
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
            //add a space to each square   
            gameBoardArray.push(" ");
        }
    };

    //function to start new game
    const newGame = () => {
        initialiseGameBoard();
        displayController.renderBoard(getBoardStatus());
        displayController.resetDisplayRestrictions();
        currentPlayer = "O";

    }

    //internal function to switch player
    const switchPlayer = () => {
        if (currentPlayer == "O") {
            currentPlayer = "X";
        } else {
            currentPlayer = "O";
        }
    }

    //internal function to check for a winner
    //I know there must be a less 'muscular' way to do things than this,
    //but this will work for now!
    const checkforWinner = (player) => {
        /*
                0 1 2
                3 4 5
                6 7 8
            */
        //check for diagonal wins
        if( (gameBoardArray[0] == player && gameBoardArray[4] == player && gameBoardArray[8] == player) ||
            (gameBoardArray[2] == player && gameBoardArray[4] == player && gameBoardArray[6] == player)) {
            console.log("Winner");
            return true;
        } else if 
            //check for horizontal wins
            ((gameBoardArray[0] == player && gameBoardArray[1] == player && gameBoardArray[2] == player) ||
             (gameBoardArray[3] == player && gameBoardArray[4] == player && gameBoardArray[5] == player) || 
             (gameBoardArray[6] == player && gameBoardArray[7] == player && gameBoardArray[8] == player)) {
                console.log("Winner");
                return true;   
        } else if 
            //check for vertical wins
            ((gameBoardArray[0] == player && gameBoardArray[3] == player && gameBoardArray[6] == player) ||
             (gameBoardArray[1] == player && gameBoardArray[4] == player && gameBoardArray[7] == player) || 
             (gameBoardArray[2] == player && gameBoardArray[5] == player && gameBoardArray[8] == player)) {
                console.log("Winner");   
                return true;
            }
        //return false if no wins found
        return false;
    }

    //choose a random number between 0 and 8 for the computer's move
    //if that position in the array is taken, choose another
    const chooseComputerMove = () => {
        let positionTaken = true;
        while (positionTaken) {
            var randomPosition = Math.floor((Math.random() * 9)); // 0-8 is 9 numbers
            if (gameBoardArray[randomPosition] == " ") {
                positionTaken = false;
            }
        }
        return randomPosition;
    }

    //function add the current player's counter to their chosen position
    const addCounterToBoard = (square) => {
        //add to the correct position in the board array
        //then redraw the board
        //console.log(square);
        
        //get the id of the selected square by
        //slicing the last character of the id attribute
        //check that the selected element is blank
        if (gameBoardArray[square.srcElement.id.slice(-1)] == " ") {
            gameBoardArray[square.srcElement.id.slice(-1)] = currentPlayer
            //redraw the board
            displayController.renderBoard(getBoardStatus());
            //check for winner
            if (checkforWinner(currentPlayer)) {
                setTimeout(() => {
                    alert(`Player ${currentPlayer} is the Winner!`);
                }, 20); 

                //setTimeout(() => alert(`Player ${currentPlayer} is the Winner!`));

                //alert(`Player ${currentPlayer} is the Winner!`)
            }
            switchPlayer();
            //if the player is now "X", choose a random position
            //for the computer to play
            if (currentPlayer == "X") {
                gameBoardArray[chooseComputerMove()] = currentPlayer;
                displayController.renderBoard(getBoardStatus());
                if (checkforWinner(currentPlayer)) {
                    setTimeout(() => {
                        alert(`Player ${currentPlayer} is the Winner!`);
                    }, 20); 
                }
                switchPlayer();
            }
        } else {

            console.log(square);
        }

    }

    //return the current board game status array
    const getBoardStatus = () => {
		return gameBoardArray;
	};

    //make functions available outside of this module
    return{newGame, getBoardStatus, addCounterToBoard};

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
        square.addEventListener("click", gameBoard.addCounterToBoard);
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
            //if the square isn't blank, make it unselectable
            if (gameArray[i] !== " ") {
                boardSquare.classList.add("unselectable");
            }
        }
    };

    //remove the highlighting of squares already chosen
    const resetDisplayRestrictions = () => {
        boardGameDOM.forEach((square) =>  {
            square.classList.remove("unselectable");
        });
    }

    //make functions available outside of this module
    return{renderBoard, resetDisplayRestrictions};
})();



//initial function to execute on page load
const enterPage = function () {
    gameBoard.newGame();
}


//code to execute on initial page load
enterPage();
const playerOne = Player("Greg", "X");
const playerTwo = Player("Computer", "O");
