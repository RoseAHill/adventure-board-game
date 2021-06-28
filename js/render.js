/* UI element selectors */

const turnPlayersTurnEl = document.querySelector("#players-turn")
const turnPhaseTitleEl = document.querySelector("#phase-title")
const turnPhaseTextEl = document.querySelector("#phase-text")
const turnPhaseDescriptionEl = document.querySelector("#phase-description")

const winnerMessageEl = document.querySelector("#winner-header")

const playerInfoEl = document.querySelector("#player-info")

/* Render Functions */

function renderCurrentWinner() {
  let currentWinner = getCurrentWinners()
  winnerMessageEl.innerText = `${currentWinner.join(" and ")} Won!`
  console.log(`${currentWinner.join(" and ")} Won!`)
}

function renderPhase() {
  turnPlayersTurnEl.innerText = `${currentPlayer["pName"]}'s turn!`
  turnPhaseTitleEl.innerText = `${turnPhases[currentTurnPhaseIndex]["phaseTitle"] ? turnPhases[currentTurnPhaseIndex]["phaseTitle"] : ""}`
  turnPhaseDescriptionEl.innerText = `${turnPhases[currentTurnPhaseIndex]["phaseDescription"]}`
}

function renderPhaseText(...text) {
  
  if (!turnPhaseTitleEl.innerText) {
    turnPhaseTitleEl.innerText = text.shift()
  }
  if (text.length) {
    turnPhaseTextEl.innerText = ""
    text.forEach(textLine => {
      turnPhaseTextEl.innerText += `${textLine}\n`
    });
  }
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