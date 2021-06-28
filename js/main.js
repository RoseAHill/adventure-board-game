/* Game Constants & Templates */

// Template of the color list
const colorListTemp = ["red", "green", "blue", "orange", "purple", "yellow"]

const playerTemp = {    // The player template, an object that gets
  pName: "Player 0",    // copied to the player list
  pColor: null,
  pSquare: 0,
  pCoins: 0,
  isTurn: false
}

/* Game Variables */


let finishLine = 50     // The finish line square amount
let maxRounds = 20      // The maximum amount of rounds to play
let playerList = []     // The list of players

let unusedColors = [...colorListTemp]   // List of unused colors

let gameState = -1

/* Trackers */

let inDebugMode = false

let currentRound = 0
let currentPlayerIndex = 0
let currentPlayer = null

let currentTurnPhaseIndex = 0

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
    console.log("Resetting game...");
    gameState = -1
    playerList = []
    currentRound = 0
    unusedColors = [...colorListTemp]
    toggleStartResetBtn()
    debugPlayerData()
    disableGameControls()
  } else {
    console.log("Game is already reset");
  }
}

// Adds players to player list
function addPlayer(...playerNames) {
  playerNames.forEach(playerName => {
    if (unusedColors.length > 0) {
      let player = Object.assign({}, playerTemp)
      player["pName"] = playerName
      player["pColor"] = unusedColors.shift()
      playerList.push(player)
      console.log(`Created Player ${playerList.length} with data:`, player, "in player list:", playerList)
    } else {
      console.log("Cannot create another player, no more player slots.")
      return true
    }
  });
  renderPlayerStats()
}

function rollDice(numDice = 1, sides = 6) {
  console.log(`Rolling ${numDice > 1 ? numDice : "a"} ${sides} sided ${numDice > 1 ? "dice" : "die"}`);
  let rolls = []
  for (let i = 0; i < numDice; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1)
  }
  let sum = rolls.reduce((sum, roll) => sum + roll, 0)
  if(numDice != 1) console.log(`Results are in: ${rolls.join(" + ")} = ${sum}`)
  rolls.unshift(sum)
  return rolls
}

function startPhase() {
  turnPhases[currentTurnPhaseIndex]["phaseAction"]()
  renderPhase()
  renderPlayerStats()
}
// Shifts to next player,
function nextPlayer() {
  if (!!gameState) {
    console.log("Game is not in progress. Start game to play.")
    return false
  }
  console.log("Next Player!");
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
    console.log("Game is not in progress. Start game to play.")
    return false
  }
  if (currentTurnPhaseIndex === turnPhases.length - 1) {
    nextPlayer()
    console.log(`Moving on to ${currentPlayer["pName"]}'s turn`);
  } else {
    currentTurnPhaseIndex++
    console.log(`Moving to ${turnPhases[currentTurnPhaseIndex]["phaseName"]} phase...`)
  }
  startPhase()
  return true
}

function roundTracker() {
  currentRound++
  if (currentRound > maxRounds) {
    console.log(`The game hit the max rounds! Determining winner...`);
    toggleWinner()
  } else if (currentRound === maxRounds) {
    console.log(`Round ${currentRound}, start! It's the last round, so make it count!`);
  } else {
    console.log(`Round ${currentRound}, start!`);
  }
}

// Sets up game
function gameSetup() {
  if (gameState != -1) {
    console.log("Game is already in progress.")
    return false
  }
  genBoard()
  renderPlayerStats()
  return true
}

// Starts the game
function gameStart() {
  if (!!gameState) {
    console.log("Starting game...");
    gameState = 0
    currentPlayerIndex = 0
    currentPlayer = playerList[currentPlayerIndex]
    toggleStartResetBtn()
    enableGameControls()
    roundTracker()
    renderPhase()
  } else {
    console.log("Game has already started...");
  }
}

// To be used in some events
function passTurn(playerNum = 0) {
  if (!!gameState) {
    console.log("Game is not in progress. Start game to play.")
    return false
  }
  let playerIndex = --playerNum
  if (playerIndex === -1) {
    nextPlayer()
  } else if(Math.abs(playerIndex) >= playerList.length) {
    console.log(`${playerIndex} is an invalid player index. Passing to next player.`)
    nextPlayer()
  } else {
    console.log(`Passing to player ${playerIndex}!`)
    currentPlayer = playerList[playerIndex]
    currentPlayerIndex = playerIndex
  }
}

function toggleWinner() {
  console.log(`There is a winner`);
}

/* Page Load */

gameSetup()