
const turnPhases = [
  {phaseName: "Confirm", phaseAction: phaseConfirm, phaseDescription: "Are you ready? Roll!"},
  {phaseName: "Move", phaseAction: phaseMove, phaseDescription: "Confirm your movement."},
  {phaseName: "Event", phaseAction: phaseEvent, phaseDescription: "See the results of your actions..."},
  {phaseName: "Resolve", phaseAction: phaseResolve, phaseDescription: "End your turn..."}
]

function phaseConfirm() {
  console.log(`Confirm phase activated`)
}

function phaseMove() {
  console.log(`Move phase activated`)
  let playerRoll = rollDice()
  currentPlayer["pSquare"] += playerRoll[0]
  console.log(`${currentPlayer["pName"]} moved forward ${playerRoll[0]} squares. They are at square ${currentPlayer["pSquare"]}`)
  if (currentPlayer["pSquare"] >= finishLine) {
    toggleWinner()
  }
}

function phaseEvent() {
  console.log(`Event phase activated`)
  
}

function phaseResolve() {
  console.log(`Resolve phase activated`)
  
}