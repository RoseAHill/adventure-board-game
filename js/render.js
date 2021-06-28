/* UI element se0lectors */

const turnPlayersTurnEl = document.querySelector("#players-turn")
const turnPhaseTitleEl = document.querySelector("#phase-title")
const turnPhaseDescriptionEl = document.querySelector("#phase-description")

const playerInfoEl = document.querySelector("#player-info")

/* Render Functions */

function renderCurrentWinner() {
  let currentWinner = getCurrentWinners()
}

function renderPhase() {
  turnPlayersTurnEl.innerText = `${currentPlayer["pName"]}'s turn!`
  turnPhaseTitleEl.innerText = `${turnPhases[currentTurnPhaseIndex]["phaseName"]} Phase`
}

function renderPlayerStats() {
  playerInfoEl.textContent = ""
  playerList.forEach((player, index) => {
    let playerDivEl = document.createElement('div')
    playerDivEl.classList = "player-info"
    playerDivEl.id = `player${++index}-info`

    let playerNameEl = document.createElement('h3')
    playerNameEl.innerText = `Player ${index}: ${player["pName"]}`
    playerDivEl.appendChild(playerNameEl)

    let playerSquareEl = document.createElement('p')
    playerSquareEl.innerText = `Squares: ${player["pSquare"]}`
    playerDivEl.appendChild(playerSquareEl)

    let playerCoinEl = document.createElement('p')
    playerCoinEl.innerText = `Coins: ${player["pCoins"]}`
    playerDivEl.appendChild(playerCoinEl)

    playerInfoEl.appendChild(playerDivEl)
  });
}