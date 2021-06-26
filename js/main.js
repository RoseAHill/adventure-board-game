/* Game Constants & Templates */

const turnPhases = ["confirm","move","event","resolve", "end"]

// Template of the color list
const colorListTemp = ["red", "green", "blue", "orange", "purple", "yellow"]

const playerTemp = {    // The player template, an object that gets
  pName: "Player 0",    // copied to the player list
  pColor: null,
  pSquare: 0,
  pCoins: 0
}

/* Game Variables */

let finishLine = 50     // The finish line square amount.
let playerList = []     // The list of players

let unusedColors = [...colorListTemp]   // List of unused colors

/* Trackers */

let currentPlayerIndex = 0
let currentPlayer = null

let currentTurnPhase = 0

/* Render Functions */

function renderCurrentWinner() {
  let currentWinner = getCurrentWinners()
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
function addPlayer(playerName) {
  if (unusedColors.length > 0) {
    let player = Object.assign({}, playerTemp)
    player["pName"] = playerName
    player["pColor"] = unusedColors.shift()
    playerList.push(player)
    console.log(`Created Player ${playerList.length} with data:`, player, "in player list:", playerList)
  } else {
    console.log("Cannot create another player, no more player slots.")
  }
}

// Starts the game
function startGame() {
  currentPlayerIndex = 0
  currentPlayer = playerList[currentPlayerIndex]

}

/* Page Load */

debugSetPlayers()
