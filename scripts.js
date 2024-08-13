/*
TO DO
- Remove the cell divs from html and render them using javascript
*/

const Player = (function () {
  // Private
  function createPlayer(marker) {
    let moves = []; // stores all the indexes at which the player places his/her marker

    function get() {
      return { marker, moves };
    }
    function updateMoves(cellID) {
      moves.push(cellID);
    }
    function resetPlayerMoves() {
      moves = [];
    }

    return { get, updateMoves, resetPlayerMoves };
  }

  const playerX = createPlayer("X");
  const playerO = createPlayer("O");

  /**
   * const { getPlayer: getPlayerX, updatePlayerMoves: updatePlayerMovesX } = createPlayer("X");
   * const { getPlayer: getPlayerO, updatePlayerMoves: updatePlayerMovesO } = createPlayer("O");
   *
   * the above statements take the value of getPlayer from the object returned by createPlayer()
   * and then store it inside getPlayerX and getPlayerO respectively
   * this is called reverse destructuring
   */

  return { playerX, playerO };
})();

const Board = (function (doc) {
  //  Winning combinations on the board
  const winnningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // DOM elements
  const message = doc.querySelector(".message");
  const startButton = doc.querySelector("#start");

  // contains the info about which cell on the board has which marker
  const boardStatus = new Array(9);

  // Private functions
  function registerMove(cellID, currPlayer) {
    boardStatus[cellID] = currPlayer.get().marker;
    currPlayer.updateMoves(cellID);
  }
  function renderBoard() {
    boardStatus.forEach((marker, index) => {
      let currentCell = doc.getElementById(`${index}`);
      currentCell.textContent = marker;
    });
  }
  function isWinner(currPlayer) {
    return winnningCombinations.some((combination) => combination.every((index) => currPlayer.get().moves.includes(index)));
  }
  function nextPlayer(currPlayer) {
    currPlayer = currPlayer.get().marker === Player.playerX.get().marker ? Player.playerO : Player.playerX;
    message.textContent = `Turn: Player ${currPlayer.get().marker}`;
    return currPlayer;
  }
  function displayWinner(winner) {
    message.textContent = `The winner is Player ${winner.get().marker}`;
    removeEventsFromBoardCells();
  }

  function handleClick(e) {
    registerMove(Number(e.target.id), currentPlayer);
    renderBoard();
    if (isWinner(currentPlayer)) {
      displayWinner(currentPlayer);
    } else {
      currentPlayer = nextPlayer(currentPlayer);
    }
  }
  function addEventsToBoardCells() {
    console.log("events added"); // logs

    let cells = doc.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", handleClick);
    });
  }
  function removeEventsFromBoardCells() {
    console.log("events removed"); // logs

    let cells = doc.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.removeEventListener("click", handleClick);
    });
  }

  // Public functions
  function init() {
    addEventsToBoardCells();
    startButton.textContent = "Restart Game";
  }

  function reset() {
    // prerequisites to start game
    // these are such because this method is also used for initializing the game
    // when it starts for the first time
    // and also for restting the game each time after

    // initializes all the array positions with empty string
    boardStatus.fill("");

    // intialise player moves with an empty array
    Player.playerX.resetPlayerMoves();
    Player.playerO.resetPlayerMoves();

    // make X the first player
    currentPlayer = Player.playerX;

    // paint board on screen
    renderBoard();

    // set text of start-button once the game ends
    startButton.textContent = "Start Game";

    // set the text of message to an empty string before each new game
    message.textContent = `Player ${currentPlayer.get().marker} goes first.`;

    // remove previous event listeners if present
    removeEventsFromBoardCells();
  }

  return { init, reset };
})(document);

const GameController = (function (doc) {
  function startGame() {
    Board.reset();
    Board.init();
  }

  return { startGame };
})(document);

const startButton = document.querySelector("#start");
startButton.addEventListener("click", (e) => {
  GameController.startGame();
});
