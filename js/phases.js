
const turnPhases = [
  {phaseName: "Confirm", phaseAction: phaseConfirm, phaseTitle: "Are you ready?", phaseDescription: "Press the Next button to roll!"},
  {phaseName: "Move", phaseAction: phaseMove, phaseTitle: "Move forward!", phaseDescription: "Press Next to see what happens..."},
  {phaseName: "Event", phaseAction: phaseEvent, phaseTitle: null, phaseDescription: "Press Next to see the end results..."},
  {phaseName: "Resolve", phaseAction: phaseResolve, phaseTitle: null, phaseDescription: "Press Next to end your turn!"}
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