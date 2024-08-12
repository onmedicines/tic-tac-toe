/*
TO DO
- Remove the cell divs from html and render them using javascript 
*/

const GameController = (function (doc) {
  /*

  choose Marker X or O
  create player with the marker
  create a second player for computer with the opposite marker
   

  generate board and add eventListeners to the button/divs 
  check for winner after each turn
  on winning, display the winner

  */

  function startGame() {
    Board.init();
  }

  return { startGame };
})(document);

const Player = (function () {
  function createPlayer(marker) {
    return { marker, moves: [] }; // moves[] stores the index at which the player places his/her marker
  }

  return { createPlayer };
})();

const Board = (function (doc) {
  /**
   * Board() does the following things
   */

  // DOM access variables
  const board = doc.querySelector(".board");
  const boardStatus = new Array(9).fill(""); // store moves by X and O together at the respective index - used to render board
  const playerX = Player.createPlayer("X");
  const playerO = Player.createPlayer("O");
  let currentPlayer = playerX;

  // utility functions
  function registerMove(cellID) {
    boardStatus[cellID] = currentPlayer.marker;
    currentPlayer.moves.push(cellID);
  }
  function switchCurrentPlayer(currPlayer) {
    currentPlayer = currPlayer.marker === playerX.marker ? playerO : playerX;
  }
  function renderBoard() {
    boardStatus.forEach((marker, index) => {
      let currentCell = doc.getElementById(`${index}`);
      currentCell.textContent = marker;
    });
  }
  function addEventsToBoardCells() {
    let cells = board.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        console.log(e.target.id);
        registerMove(Number(e.target.id));
        renderBoard();
        switchCurrentPlayer(currentPlayer);
      });
    });
  }

  // UI functions
  function init() {
    addEventsToBoardCells();
  }

  return { init };
})(document);

GameController.startGame();
