const runGame = () => {
  //  Winning combinations in a tic tac toe game
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

  // FUNCTIONS
  // function to create a new player and return a player object with keys "marker" and "moves"
  const createPlayer = (marker) => ({ marker, moves: [] });
  // function to check and return if the given player is a winner or not
  const isWinner = (player) => winnningCombinations.some((combination) => combination.every((element) => player.moves.includes(element)));

  // VARIABLES
  // variables for calculations
  const player1 = createPlayer("X");
  const player2 = createPlayer("O");

  console.log({ player1, player2 }); // logs

  let currentPlayer = player1; // let player1 always be the starting player

  console.log({ currentPlayer }); // logs

  // variables to store DOM elements
  const board = document.querySelector(".board");
  const heading = document.querySelector(".heading-container > h1"); // the h1 containing the title "TIC TAC TOE" and displaying the winner

  // add event listeners to all the clickable divs inside the board to listen for player clicks
  board.querySelectorAll(".cell").forEach((cell, index) => {
    console.log({ "loop runs": index + 1 }); // logs

    cell.addEventListener("click", handleCellClick);

    function handleCellClick(e) {
      console.log("event listener fired"); // logs

      //  add marker to the clicked cell
      e.target.textContent = currentPlayer.marker;
      // add played move to the moves array of the current player
      currentPlayer.moves.push(Number(e.target.id));

      // check for a winner each time a player makes a move
      console.log(`checking if Player ${currentPlayer.marker} is the winner...`); // logs
      if (isWinner(currentPlayer)) {
        console.log("Yes"); // logs
        heading.textContent = `The winner is Player ${currentPlayer.marker}`;
      } else {
        // logs
        console.log("No"); // logs
      } // logs

      console.log(currentPlayer.marker, currentPlayer.moves); // logs

      // update current player
      currentPlayer = currentPlayer.marker === player1.marker ? player2 : player1;

      console.log(currentPlayer.marker, currentPlayer.moves); // logs

      // remove event listener from the already clicked cell to disable overwriting it
      e.target.removeEventListener("click", handleCellClick);
    }
  });
};

runGame();
