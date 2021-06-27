
/* Game Controls */

const gameNextBtnEl = document.querySelector("#game-next")

/* Debug UI Button Elements */

const debugStatusBtnEl = document.querySelector("#game-status")
const debugSetupBtnEl = document.querySelector("#game-setup")
const debugStartBtnEl = document.querySelector("#game-start")
const debugResetBtnEl = document.querySelector("#game-reset")

const debugBoardGenBtnEl = document.querySelector("#board-gen")

/* Toggle Game Controls */

function enableGameControls() {
  if(gameNextBtnEl.hasAttribute("disabled")) {
    console.log(`Enabling game controls`)
    gameNextBtnEl.removeAttribute("disabled")
  } else { console.log(`Game controls already enabled`)}
}

function disableGameControls() {
  if(!gameNextBtnEl.hasAttribute("disabled")) {
    console.log(`Disabling game controls`)
    gameNextBtnEl.setAttribute("disabled", "")
  } else console.log(`Game controls already disabled`)
}

/* Game UI Button Handlers */

function handleNextPhase() {
  nextPhase()
}


/* Debug UI Button Handlers */

function logGameStatus() {
  console.log("Logging game status...")
  debugPlayerData()
  debugCurrentWinner()
  debugCurrentTurn()
}

function debugSetupGame(numPlayers = 6) {
  debugFillPlayers(numPlayers)
}

function debugStartGame() {
  if (!playerList.length) {
    debugSetupGame(6)
  }
  if (!gameState) {
    console.log(`Game already started...`);
  } else {
    gameStart()
  }
}

function debugResetGame() {
  resetGameVariables()
}

/* Add Event Handlers */

// Debug event handlers
debugStatusBtnEl.addEventListener("click", logGameStatus)
debugSetupBtnEl.addEventListener("click", () => {debugSetupGame(6)})
debugStartBtnEl.addEventListener("click", debugStartGame)
debugResetBtnEl.addEventListener("click", debugResetGame)
debugBoardGenBtnEl.addEventListener("click", genBoard)

// Game event Handlers
gameNextBtnEl.addEventListener("click", handleNextPhase)