const turnPhases = [{
    phaseName: "Confirm",
    phaseAction: phaseConfirm,
    phaseTitle: "Are you ready?",
    phaseDescription: "Press the Next button to roll!"
  },
  {
    phaseName: "Move",
    phaseAction: phaseMove,
    phaseTitle: null,
    phaseDescription: "Press Next to see what happens..."
  },
  {
    phaseName: "Event",
    phaseAction: phaseEvent,
    phaseTitle: null,
    phaseDescription: "Press Next to see the end results..."
  },
  {
    phaseName: "Resolve",
    phaseAction: phaseResolve,
    phaseTitle: "End results are in...",
    phaseDescription: "Press Next to end your turn!"
  }
]

let tempResults = []

function phaseConfirm() {
  console.log(`Confirm phase activated`)
  renderPhaseText(`Make sure ${currentPlayer.pName} is here!`)
}

function phaseMove() {
  console.log(`Move phase activated`)
  let playerRoll = rollDice()
  let sumOfRoll = playerRoll.shift()
  currentPlayer["pSquare"] += sumOfRoll
  if (currentPlayer.pSquare > 40) currentPlayer["pSquare"] = 40

  if (currentPlayer.pSquare >= finishLine) {
    toggleWinner()
    return true
  }

  let currentBoardEffect = boardEffects[gameBoard[currentPlayer.pSquare - 1]]
  console.log("Board effect: ", currentBoardEffect)
  console.log("Current Player: ", currentPlayer)
  console.log("board effect num: ", gameBoard[currentPlayer.pSquare - 1])
  renderPhaseText(`You rolled a ${sumOfRoll}${(playerRoll.length > 1) ? `(${playerRoll.join(" + ")})`: "" }`,
    `You move forward ${sumOfRoll} space${sumOfRoll > 1 ? "s" : ""}. You are now on square ${currentPlayer.pSquare}`,
    `${currentBoardEffect.sqMessage}`)
  console.log(`${currentPlayer.pName} moved forward ${sumOfRoll} squares. They are at square ${currentPlayer.pSquare}`)

  tempResults.push(`${currentPlayer.pName} moved forward ${sumOfRoll} space${sumOfRoll > 1 ? "s" : ""}, landing on a ${currentBoardEffect.sqName}`)

}

function phaseEvent() {
  console.log(`Event phase activated`)
  let currentEvent = boardEffects[gameBoard[currentPlayer.pSquare - 1]]
  let effectResult = currentEvent.sqEffect()
  tempResults.push(`\n${currentPlayer.pName} ${effectResult}\n`)
  renderPhaseText(`You ${effectResult}`)
}

function phaseResolve() {
  console.log(`Resolve phase activated`)
  renderPhaseText(tempResults.shift(), tempResults.join("\n"))
  tempResults = []
}