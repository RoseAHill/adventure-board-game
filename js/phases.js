
const turnPhases = [
  {phaseName: "Confirm", phaseAction: phaseConfirm, phaseTitle: "Are you ready?", phaseDescription: "Press the Next button to roll!"},
  {phaseName: "Move", phaseAction: phaseMove, phaseTitle: null, phaseDescription: "Press Next to see what happens..."},
  {phaseName: "Event", phaseAction: phaseEvent, phaseTitle: null, phaseDescription: "Press Next to see the end results..."},
  {phaseName: "Resolve", phaseAction: phaseResolve, phaseTitle: "End results are in...", phaseDescription: "Press Next to end your turn!"}
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
  let currentBoardEffect = boardEffects[gameBoard[currentPlayer.pSquare]]
  currentPlayer["pSquare"] += sumOfRoll
  renderPhaseText(`You rolled a ${sumOfRoll}${(playerRoll.length > 1) ? `(${playerRoll.join(" + ")})`: "" }`,
                  `You move forward ${sumOfRoll} space${sumOfRoll > 1 ? "s" : ""}. You are now on square ${currentPlayer.pSquare}`,
                  `${currentBoardEffect.sqMessage}`)
  console.log(`${currentPlayer.pName} moved forward ${sumOfRoll} squares. They are at square ${currentPlayer.pSquare}`)
  
  tempResults.push(`${currentPlayer.pName} moved forward ${sumOfRoll} space${sumOfRoll > 1 ? "s" : ""}, landing on a ${currentBoardEffect.sqName}`)
  

  if (currentPlayer["pSquare"] >= finishLine) {
    toggleWinner()
  }
}

function phaseEvent() {
  console.log(`Event phase activated`)
  renderPhaseText(`Head`, `Text`)
}

function phaseResolve() {
  console.log(`Resolve phase activated`)
  renderPhaseText(tempResults)
  tempResults = []
}