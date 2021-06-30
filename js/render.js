/* UI element selectors */

const turnPlayersTurnEl = document.querySelector("#players-turn")
const turnPhaseTitleEl = document.querySelector("#phase-title")
const turnPhaseTextEl = document.querySelector("#phase-text")
const turnPhaseDescriptionEl = document.querySelector("#phase-description")

const winnerMessageEl = document.querySelector("#winner-header")

const playerInfoEl = document.querySelector("#player-info")

const boardVisualsEl = document.querySelector("#board-visuals")

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
  turnPhaseTextEl.innerText = ""
  if (!turnPhaseTitleEl.innerText) {
    turnPhaseTitleEl.innerText = text.shift()
  }
  if (text.length) {
    turnPhaseTextEl.innerText += `${text[0]}\n`
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

// Board Render

function renderBoard() {
  gameBoard.forEach((space, index) => {
    let squareBox = document.createElement('div')
    let renderSquare = document.createElement('div')
    let boardNum = document.createElement('p')
    squareBox.id = `board-space${index + 1}`
    squareBox.className = `board-space-boxes`
    renderSquare.className = `board-space board-color-${boardEffects[space].sqColor}`
    boardNum.innerText = index + 1
    renderSquare.appendChild(boardNum)
    squareBox.appendChild(renderSquare)
    boardVisualsEl.appendChild(squareBox)
  });
}

function renderPlayersBoard() {
  playerList.forEach(player => {
    let playerSpaceEl = document.querySelector(`#board-space${player.pSquare}`)
  });
}

