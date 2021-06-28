
/* Game Controls */

const gameStartBtnEl = document.querySelector("#game-start")
const gameResetBtnEl = document.querySelector("#game-reset")
const gameNextBtnEl = document.querySelector("#game-next")

/* Debug UI Button Elements */

const debugToggleEl = document.querySelector("#d")

const debugStatusBtnEl = document.querySelector("#game-debug-status")
const debugSetupBtnEl = document.querySelector("#game-debug-setup")
const debugStartBtnEl = document.querySelector("#game-debug-start")
const debugResetBtnEl = document.querySelector("#game-debug-reset")

const debugBoardGenBtnEl = document.querySelector("#board-gen")

/* Toggle Game Controls */
function toggleStartResetBtn() {
  if (gameState === -1) {
    !gameResetBtnEl.hasAttribute("hidden") && gameResetBtnEl.setAttribute("hidden", "")
    gameStartBtnEl.hasAttribute("hidden") && gameStartBtnEl.removeAttribute("hidden")
  } else {
    !gameStartBtnEl.hasAttribute("hidden") && gameStartBtnEl.setAttribute("hidden", "")
  }
  if (gameState === 1) {
    gameResetBtnEl.hasAttribute("hidden") && gameResetBtnEl.removeAttribute("hidden")
  }
}

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

function startGameHandler() {
  if (playerList.length < 3) {
    console.log("Minimum of 3 players!!!")
  } else if (gameState === -1) {
    gameStart()
  } else {
    console.log("Can't start!")
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