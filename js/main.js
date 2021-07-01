/* Game Constants & Templates */

// Template of the color list
const colorListTemp = ["red", "green", "blue", "orange", "purple", "yellow"]

const playerTemp = { // The player template, an object that gets
  pName: "Player 0", // copied to the player list
  pColor: null,
  pSquare: 0,
  pCoins: 0,
  isTurn: false
}

const winFanfare = new Audio('https://www.myinstants.com/media/sounds/untitled_340.mp3')
const rollSound = new Audio('https://www.myinstants.com/media/sounds/shake-and-roll-dice-soundbible.mp3')
const roll1 = new Audio('https://www.myinstants.com/media/sounds/kickthebuddytrashad720x1280mp4bevideotoaudio202106162032061623855873706bemerge202_0HZPFUz.mp3')
const roll2 = new Audio('https://www.myinstants.com/media/sounds/song-of-double-time.mp3')
const roll3 = new Audio('https://www.myinstants.com/media/sounds/oh_baby_a_triple.mp3')
const roll4 = new Audio('../assets/four.mp3')
const roll5 = new Audio('../assets/five.mp3')
const roll6 = new Audio('https://www.myinstants.com/media/sounds/sound-effect-they-see-me-rolling-audiotrimmer.mp3')

/* Game Variables */

let finishLine = 40 // The finish line square amount
let maxRounds = 20 // The maximum amount of rounds to play
let playerList = [] // The list of players

let unusedColors = [...colorListTemp] // List of unused colors

let gameState = -1

/* Trackers */

let inDebugMode = false

let currentRound = 0
let currentPlayerIndex = 0
let currentPlayer = null

let currentTurnPhaseIndex = 0

let viewLightMode = true

/* Functions */

// Gets Current Winner
function getCurrentWinners() {
  let highestSquareValue = 0
  let tempWinners = []
  playerList.forEach((player, index) => {
    if (player.pSquare > highestSquareValue) {
      highestSquareValue = player.pSquare
      tempWinners = [index + 1]
    } else if (player.pSquare === highestSquareValue) {
      tempWinners.push(index + 1)
    }
  })
  return tempWinners
}

// Resets Game Variables
function resetGameVariables() {
  if (gameState != -1) {
    inDebugMode && console.log("Resetting game...");
    gameState = -1
    playerList = []
    currentRound = 0
    unusedColors = [...colorListTemp]
    turnInfoEl.style.display = "inherit"
    toggleStartResetBtn()
    debugPlayerData()
    disableGameControls()
  } else {
    inDebugMode && console.log("Game is already reset");
  }
}

// Adds players to player list
function addPlayer(...playerNames) {
  if (playerNames.length > 6) {
    playerNames = playerNames.slice(0, 6)
  }
  playerNames.forEach(playerName => {
    if (unusedColors.length > 0) {
      let player = Object.assign({}, playerTemp)
      player["pName"] = playerName
      player["pColor"] = unusedColors.shift()
      playerList.push(player)
      inDebugMode && console.log(`Created Player ${playerList.length} with data:`, player, "in player list:", playerList)
    } else {
      inDebugMode && console.log("Cannot create another player, no more player slots.")
      return true
    }
  });
  renderPlayerStats()
  toggleStartResetBtn()
}

function rollDice(numDice = 1, sides = 6) {
  inDebugMode && console.log(`Rolling ${numDice > 1 ? numDice : "a"} ${sides} sided ${numDice > 1 ? "dice" : "die"}`);
  let rolls = []
  for (let i = 0; i < numDice; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1)
  }
  rollSound.play()
  let sum = rolls.reduce((sum, roll) => sum + roll, 0)
  setTimeout(() => {
    sum === 1 && roll1.play()
    sum === 2 && roll2.play()
    sum === 3 && roll3.play()
    sum === 4 && roll4.play()
    sum === 5 && roll5.play()
    sum === 6 && roll6.play()
  }, rollSound.duration);
  if (numDice != 1 && inDebugMode) console.log(`Results are in: ${rolls.join(" + ")} = ${sum}`)
  rolls.unshift(sum)
  return rolls
}

function startPhase() {
  renderPhase()
  turnPhases[currentTurnPhaseIndex]["phaseAction"]()
  renderPlayerStats()
}
// Shifts to next player,
function nextPlayer() {
  if (!!gameState) {
    inDebugMode && console.log("Game is not in progress. Start game to play.")
    return false
  }
  inDebugMode && console.log("Next Player!");
  if (currentPlayerIndex === playerList.length - 1) {
    currentPlayerIndex = 0
    roundTracker()
  } else {
    currentPlayerIndex++
  }
  currentPlayer = playerList[currentPlayerIndex]
  currentTurnPhaseIndex = 0
  return true
}


// Shifts to next turn phase
function nextPhase() {
  if (!!gameState) {
    inDebugMode && console.log("Game is not in progress. Start game to play.")
    return false
  }
  if (currentTurnPhaseIndex === turnPhases.length - 1) {
    nextPlayer()
    inDebugMode && console.log(`Moving on to ${currentPlayer["pName"]}'s turn`);
  } else {
    currentTurnPhaseIndex++
    inDebugMode && console.log(`Moving to ${turnPhases[currentTurnPhaseIndex]["phaseName"]} phase...`)
  }
  startPhase()
  return true
}

function roundTracker() {
  currentRound++
  if (currentRound > maxRounds) {
    inDebugMode && console.log(`The game hit the max rounds! Determining winner...`);
    toggleWinner(true)
  } else if (currentRound === maxRounds) {
    inDebugMode && console.log(`Round ${currentRound}, start! It's the last round, so make it count!`);
  } else {
    inDebugMode && console.log(`Round ${currentRound}, start!`);
  }
}

// Sets up game
function gameSetup() {
  if (gameState != -1) {
    inDebugMode && console.log("Game is already in progress.")
    return false
  }
  genBoard()
  renderPlayerStats()
  toggleStartResetBtn()
  return true
}

// Starts the game
function gameStart() {
  if (!!gameState) {
    inDebugMode && console.log("Starting game...");
    gameState = 0
    currentPlayerIndex = 0
    currentPlayer = playerList[currentPlayerIndex]
    toggleStartResetBtn()
    enableGameControls()
    roundTracker()
    renderPhase()
  } else {
    inDebugMode && console.log("Game has already started...");
  }
}

// To be used in some events
function passTurn(playerNum = 0) {
  if (!!gameState) {
    inDebugMode && console.log("Game is not in progress. Start game to play.")
    return false
  }
  let playerIndex = --playerNum
  if (playerIndex === -1) {
    nextPlayer()
  } else if (Math.abs(playerIndex) >= playerList.length) {
    inDebugMode && console.log(`${playerIndex} is an invalid player index. Passing to next player.`)
    nextPlayer()
  } else {
    inDebugMode && console.log(`Passing to player ${playerIndex}!`)
    currentPlayer = playerList[playerIndex]
    currentPlayerIndex = playerIndex
  }
}

function toggleWinner(isRoundLimit = false) {
  confetti.start(4000)
  winFanfare.play()
  renderPlayerStats()
  disableGameControls()
  toggleStartResetBtn()
  renderCurrentWinner(isRoundLimit)
  inDebugMode && console.log(`There is a winner`)
}

/* Page Load */

gameSetup()