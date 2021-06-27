/* Game Constants & Templates */

const turnPhases = ["confirm","move","event","resolve"]

// Template of the color list
const colorListTemp = ["red", "green", "blue", "orange", "purple", "yellow"]

const playerTemp = {    // The player template, an object that gets
  pName: "Player 0",    // copied to the player list
  pColor: null,
  pSquare: 0,
  pCoins: 0
}

/* Game Variables */

let finishLine = 50     // The finish line square amount
let maxRounds = 50      // The maximum amount of rounds to play
let playerList = []     // The list of players

let unusedColors = [...colorListTemp]   // List of unused colors

/* Trackers */

let currentRound = 0
let currentPlayerIndex = 0
let currentPlayer = null

let currentTurnPhaseIndex = 0

/* Render Functions */

function renderCurrentWinner() {
  let currentWinner = getCurrentWinners()
}

function renderPhaseDescription() {

}

/* Functions */

// Gets Current Winner
function getCurrentWinners() {
  let highestSquareValue = 0
  let tempWinners = []
  playerList.forEach((player, index) => {
    if (player.pSquare > highestSquareValue) {
      let highestSquareValue = player.pSquare
      tempWinners = [index + 1]
    } else if (player.pSquare === highestSquareValue) {
      tempWinners.push(index + 1)
    }
  })
  return tempWinners
}

// Resets Game Variables
function resetGameVariables() {
  playerList = []
  unusedColors = [...colorListTemp]
  debugPlayerData()
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
}

function rollDice(numDice = 1, sides = 6) {
  console.log(`Rolling ${numDice > 1 ? numDice : "a"} ${sides} sided ${numDice > 1 ? "dice" : "die"}`);
  let rolls = []
  for (let i = 0; i < numDice; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1)
  }
  let sum = rolls.reduce((sum, roll) => sum + roll, 0)
  console.log(`Results are in: ${rolls.join(" + ")} = ${sum}`)
  rolls.unshift(sum)
  return rolls
}

function startPhase() {
  
}
// Shifts to next player,
function nextPlayer() {
  console.log("Next Player!");
  if (currentPlayerIndex === playerList.length) {
    currentPlayerIndex = 0
  } else {
    currentPlayerIndex++
  }
  currentPlayer = playerList[currentPlayerIndex]
  currentTurnPhaseIndex = 0
}


// Shifts to next turn phase
function nextPhase() {
  if (currentTurnPhaseIndex === turnPhases.length) {
    nextPlayer()
  } else {
    currentTurnPhaseIndex++
  }
  startPhase()
}

// Sets up game
function gameSetup() {
  
}

// Starts the game
function gameStart() {
  currentPlayerIndex = 0
  currentPlayer = playerList[currentPlayerIndex]
}

/* Page Load */

