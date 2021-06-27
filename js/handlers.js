
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
  gameStart()
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