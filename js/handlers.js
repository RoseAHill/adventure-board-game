/* Debug UI Button Elements */

const debugStatusBtnEl = document.querySelector("#game-status")
const debugSetupBtnEl = document.querySelector("#game-setup")
const debugStartBtnEl = document.querySelector("#game-start")
const debugResetBtnEl = document.querySelector("#game-reset")

/* Debug UI Button Handlers */

function logGameStatus() {
  console.log("Logging game status...")
  debugPlayerData()
  debugCurrentWinner()
}

function debugSetupGame(numPlayers = 6) {
  debugFillPlayers(numPlayers)
}

function debugStartGame() {
  console.log("Starting game...");
}

function debugResetGame() {
  console.log("Resetting game...");
  resetGameVariables()
}

/* Add Event Handlers */

debugStatusBtnEl.addEventListener("click", logGameStatus)
debugSetupBtnEl.addEventListener("click", () => {debugSetupGame(6)})
debugStartBtnEl.addEventListener("click", debugStartGame)
debugResetBtnEl.addEventListener("click", debugResetGame)

