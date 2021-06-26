/* Debug UI Button Elements */

const debugStatusBtnEl = document.querySelector("#game-status")
const debugSetupBtnEl = document.querySelector("#game-setup")
const debugStartBtnEl = document.querySelector("#game-start")
const debugResetBtnEl = document.querySelector("#game-reset")

/* Debug UI Button Handlers */

function logGameStatus() {
  debugPlayerData()
  debugCurrentWinner()
}

function debugSetupGame(params) {
  debugFillPlayers()
}

/* Add Event Handlers */