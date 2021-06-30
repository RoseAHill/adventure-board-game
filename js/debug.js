/* Debug Functions */

let debugPlayers = ["Rose", "Matthew", "Chris", "Della", "Nick", "JD"]

/* Setters */

// Debugger: Fill player list with 6 players
function debugFillPlayers(numPlayers) {
  if (!gameState) {
    console.log(`Game already in progress, cannot change players`);
    return false
  }
  if (!numPlayers || numPlayers < 1 || numPlayers > 6) numPlayers = 6
  if (!(numPlayers <= playerList.length)) {
    numPlayers -= playerList.length
    console.log(`Setting ${numPlayers} players to default names...`)
    for (let i = 0; i < numPlayers; i++) {
      addPlayer(debugPlayers[i])
    }
    debugPlayerData()
  } else {
    console.log(`There are already ${playerList.length} players.`);
    return false
  }
  return true
}

function debugSetSquare(playerNum, square) {
  let player = playerList[playerNum - 1]
  player["pSquare"] = square
  console.log(`Placed ${player.pName} on square ${player.pSquare}.`)
}

/* Console Listings */

// Debugger: Lists players in console
function debugPlayerData() {
  console.log(`There are currently ${playerList.length} players.`)
  playerList.forEach((player, index) => {
    console.log(`Player ${index + 1}, ${player.pName} (${player.pColor}): Square ${player.pSquare}, ${player.pCoins} Coins`)
  })
  return true
}

function debugCurrentWinner() {
  let tempWinners = getCurrentWinners()
  let tempWinnerNames = []
  tempWinners.forEach(winnerNum => {tempWinnerNames.push(playerList[winnerNum - 1]["pName"])})
  if (tempWinners.length !== 0) console.log(`Currently there is ${tempWinners.length > 1 ? "a tie." : (tempWinners.length === 0 ? "no one winning" : "one person in the lead.")}`,
              `${tempWinnerNames.join(" and ")}`,
              `${tempWinners.length > 1 ? "are all" : "is"} on square ${playerList[tempWinners[0] - 1]["pSquare"]}`)
  else console.log(`There are no players, nobody can win...`)
  return true
}

function debugCurrentTurn() {
  if (!gameState) {
    console.log(`The current turn belongs to Player ${currentPlayerIndex + 1}, ${currentPlayer["pName"]}. We are on the ${turnPhases[currentTurnPhaseIndex]["phaseName"]} phase.`);
  }
}