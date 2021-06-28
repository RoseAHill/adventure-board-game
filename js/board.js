const boardEffects = [
  {sqName: "Green Space", sqColor: "green", sqMessage: "You landed on a green space. Yay, coins!" , sqWeight: 40, sqEffect: effectGreen},
  {sqName: "Red Space", sqColor: "red", sqMessage: "Oh boy, a red space...", sqWeight: 30, sqEffect: effectRed},
  {sqName: "Event Space", sqColor: "blue", sqMessage: "What's this? An event? How exciting!", sqWeight: 20, sqEffect: effectEvent},
  {sqName: "Location", sqColor: "pink", sqMessage: "A location space! Where will you end up?", sqWeight: 10, sqEffect: effectLocation}
]

let gameBoard = []

function genBoard() {
  if (gameState === 0) {
    console.log("Game is already in progress. Reset game to reset board.");
    return false
  }
  if (!!gameBoard.length) {
    console.log(`Board is already generated. Generating new board...`)
    gameBoard = []
  }
  for (let i = 1; i <= finishLine; i++) {
    let squareNum = Math.floor(Math.random() * 100)
    let squareType = 0
    let weightCount = 0
    boardEffects.every((effect, index) => {
      if (squareNum >= weightCount && squareNum < (weightCount + effect["sqWeight"])) {
        squareType = index
        return false
      }
      weightCount += effect["sqWeight"]
      return true
    });
    gameBoard.push(squareType)
  }
  console.log(`The current board is: `, gameBoard)
  return true
}

function effectGreen() {
  addCoins(3, currentPlayer)
}

function effectRed() {
  subCoins(3, currentPlayer)
}

function effectEvent() {
  effectGreen() //Placeholder
}

function effectLocation() {
  effectGreen() //Placeholder
}

function addCoins(numCoins, player) {
  player["pCoins"] += numCoins
}

function subCoins(numCoins, player) {
  player["pCoins"] -= numCoins
  if (player["pCoins"] < 0) player["pCoins"] = 0
}

