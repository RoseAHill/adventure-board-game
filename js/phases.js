
const turnPhases = [
  {phaseName: "confirm", phaseAction: phaseConfirm, phaseDescription: "Are you ready? Roll!"},
  {phaseName: "move", phaseAction: phaseMove, phaseDescription: "Confirm your movement."},
  {phaseName: "event", phaseAction: phaseEvent, phaseDescription: "See the results of your actions..."},
  {phaseName: "resolve", phaseAction: phaseResolve, phaseDescription: "End your turn..."}
]

function phaseConfirm() {
  console.log(`Confirm phase activated`)
}

function phaseMove() {
  console.log(`Move phase activated`)
  let playerRoll = rollDice()
  if (!(currentPlayer["pSquare"] + playerRoll[0] >= finishLine)) {
    currentPlayer["pSquare"] += playerRoll[0]
    console.log(`${currentPlayer["pName"]} moved forward ${playerRoll[0]} squares. They are at square ${currentPlayer["pSquare"]}`)
  } else if (currentPlayer["pSquare"] + playerRoll[0] > finishLine) {
    console.log(`You need to land exactly on the finish line to win! Unfortunately ${playerRoll[0]} is overshooting. You landed where you're standing...`);
  } else {
    toggleWinner()
  }
}

function phaseEvent() {
  console.log(`Event phase activated`)
  
}

function phaseResolve() {
  console.log(`Resolve phase activated`)
  
}