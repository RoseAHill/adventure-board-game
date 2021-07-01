/* Game Controls */

const gameStartBtnEl = document.querySelector("#game-start")
const gameResetBtnEl = document.querySelector("#game-reset")
const gameNextBtnEl = document.querySelector("#game-next")

const playerAddEl = document.querySelector("#player-add")

const docBody = document.querySelector("body")
const viewModeSwitch = document.querySelector("#mode-switch")

/* Debug UI Button Elements */

const debugToggleEl = document.querySelector("#d")
const debugSetupBtnEl = document.querySelector("#game-debug-setup")

const debugBoardGenBtnEl = document.querySelector("#board-gen")

/* Toggle Game Controls */
function toggleStartResetBtn() {
  !gameResetBtnEl.hasAttribute("hidden") && gameResetBtnEl.setAttribute("hidden", "")
  if (playerList.length > 2 && gameState === -1) {
    gameStartBtnEl.hasAttribute("hidden") && gameStartBtnEl.removeAttribute("hidden")
  } else {
    !gameStartBtnEl.hasAttribute("hidden") && gameStartBtnEl.setAttribute("hidden", "")
  }
  if (gameState === 1) {
    gameResetBtnEl.hasAttribute("hidden") && gameResetBtnEl.removeAttribute("hidden")
  }
}

function enableGameControls() {
  if (gameNextBtnEl.hasAttribute("hidden")) {
    gameNextBtnEl.removeAttribute("hidden")
  }
  if (gameNextBtnEl.hasAttribute("disabled")) {
    inDebugMode && console.log(`Enabling game controls in 3 seconds...`)
    window.setTimeout(() => {
      gameNextBtnEl.removeAttribute("disabled")
    }, 2000)
  } else {
    inDebugMode && console.log(`Game controls already enabled`)
  }
}

function disableGameControls() {
  if (gameState === 0) {
    gameNextBtnEl.setAttribute("hidden", "")
  }
  if (!gameNextBtnEl.hasAttribute("disabled")) {
    inDebugMode && console.log(`Disabling game controls`)
    gameNextBtnEl.setAttribute("disabled", "")
  } else inDebugMode && console.log(`Game controls already disabled`)
}

function pauseGameControls() {
  if (!gameNextBtnEl.hasAttribute("disabled")) {
    disableGameControls()
    enableGameControls()
  } else {
    inDebugMode && console.log(`Controls already disabled`);
  }
}

/* Game UI Button Handlers */

function handleNextPhase() {
  nextPhase()
  if (!inDebugMode) {
    pauseGameControls()
  }
}

function handleStartGame() {
  if (playerList.length < 3) {
    inDebugMode && console.log("Minimum of 3 players!!!")
  } else if (gameState === -1) {
    gameStart()
  } else {
    inDebugMode && console.log("Can't start!")
  }
}

function handleResetGame() {
  resetGameVariables()
}

function handleAddPlayer() {
  let newPlayerName = window.prompt("Enter new player name")
  if (newPlayerName) addPlayer(newPlayerName)
  if (playerList.length >= 6) {
    !playerAddEl.hasAttribute("hidden") && playerAddEl.setAttribute("hidden", "")
  }
}

function handleViewMode() {
  docBody.className = viewLightMode ? "light-mode" : "dark-mode"
  viewLightMode = !viewLightMode
}

/* Debug UI Button Handlers */

function debugToggle() {
  let toDisplay = inDebugMode ? "none" : "inherit"
  inDebugMode = !inDebugMode
  console.log(`Debug mode is ${inDebugMode ? "on": "off"}`);
  debugSetupBtnEl.style.display = toDisplay;
}

function logGameStatus() {
  console.log("Logging game status...")
  debugPlayerData()
  debugCurrentWinner()
  debugCurrentTurn()
}

function debugSetupGame(numPlayers = 6) {
  debugFillPlayers(numPlayers)
  debugSetupBtnEl.style.display = "none";
  !playerAddEl.hasAttribute("hidden") && playerAddEl.setAttribute("hidden", "")
}

function debugStartGame() {
  if (!playerList.length) {
    debugSetupGame(6)
  }
  if (!gameState) {
    inDebugMode && console.log(`Game already started...`);
  } else {
    gameStart()
  }
}


/* Add Event Handlers */

// Debug event handlers
debugToggleEl.addEventListener("click", debugToggle)

debugSetupBtnEl.addEventListener("click", () => {
  debugSetupGame(6)
})

// Game event Handlers
gameNextBtnEl.addEventListener("click", handleNextPhase)
gameStartBtnEl.addEventListener("click", handleStartGame)
gameResetBtnEl.addEventListener("click", handleResetGame)
playerAddEl.addEventListener("click", handleAddPlayer)

viewModeSwitch.addEventListener("click", handleViewMode)