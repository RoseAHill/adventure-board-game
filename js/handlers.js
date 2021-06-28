
/* Game Controls */

const gameNextBtnEl = document.querySelector("#game-next")

/* Debug UI Button Elements */

const debugToggleEl = document.querySelector("#d")

const debugStatusBtnEl = document.querySelector("#game-status")
const debugSetupBtnEl = document.querySelector("#game-setup")
const debugStartBtnEl = document.querySelector("#game-start")
const debugResetBtnEl = document.querySelector("#game-reset")

const debugBoardGenBtnEl = document.querySelector("#board-gen")

/* Toggle Game Controls */

function enableGameControls() {
  if(gameNextBtnEl.hasAttribute("disabled")) {
    console.log(`Enabling game controls in 3 seconds...`)
    window.setTimeout(() => {
      gameNextBtnEl.removeAttribute("disabled")
    }, 3000)
  } else { console.log(`Game controls already enabled`)}
}

function disableGameControls() {
  if(!gameNextBtnEl.hasAttribute("disabled")) {
    console.log(`Disabling game controls`)
    gameNextBtnEl.setAttribute("disabled", "")
  } else console.log(`Game controls already disabled`)
}

function pauseGameControls() {
  if (!gameNextBtnEl.hasAttribute("disabled")) {
    disableGameControls()
    enableGameControls()
  } else {
    console.log(`Controls already disabled`);
  }
}

/* Game UI Button Handlers */

function handleNextPhase() {
  nextPhase()
  if (!inDebugMode) {
    pauseGameControls()
  }
}


/* Debug UI Button Handlers */

function debugToggle() {
  inDebugMode = !inDebugMode
  console.log(`Debug mode is ${inDebugMode ? "on": "off"}`);
}

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
debugToggleEl.addEventListener("click", debugToggle)

debugStatusBtnEl.addEventListener("click", logGameStatus)
debugSetupBtnEl.addEventListener("click", () => {debugSetupGame(6)})
debugStartBtnEl.addEventListener("click", debugStartGame)
debugResetBtnEl.addEventListener("click", debugResetGame)
debugBoardGenBtnEl.addEventListener("click", genBoard)

// Game event Handlers
gameNextBtnEl.addEventListener("click", handleNextPhase)