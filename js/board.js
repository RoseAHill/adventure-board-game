const boardEffects = [
  {sqName: "Green Space", sqColor: "green", sqMessage: "You landed on a green space. Yay, coins!" , sqWeight: 60, sqEffect: effectGreen},
  {sqName: "Purple Space", sqColor: "purple", sqMessage: "Oh boy, a purple space...", sqWeight: 10, sqEffect: effectRed},
  {sqName: "Surprise", sqColor: "blue", sqMessage: "What's this? An surprise? How exciting!", sqWeight: 20, sqEffect: effectEvent},
  {sqName: "Location", sqColor: "pink", sqMessage: "A location space! Where will you end up?", sqWeight: 10, sqEffect: effectLocation}
]

const surpriseList = [
  {surName: "Shady Shopkeeper's Dicey Business", surDescription: "Hey kid, wanna buy some dice?", surAction: surShadyShop}
]

const locationList = [
  {locName: "Comedy Club", locDescription: "Test your latest jokes at the local comedy club's standup night!", locMessage: "Tell your best joke! Your friends may or may not approve, but the audience will judge you on their own. Impress them enough and you may win coins!", locDisplay: ""}
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
  renderBoard()
  return true
}

function effectGreen() {
  addCoins(3, currentPlayer)
  return `found 3 coins!`
}

function effectRed() {
  subCoins(3, currentPlayer)
  return `lost 3 coins...`
}

function effectEvent() {
  return ` got effected by an event`
}

function effectLocation() {
  return ` landed in town`
}

function addCoins(numCoins, player) {
  player["pCoins"] += numCoins
}

function subCoins(numCoins, player) {
  player["pCoins"] -= numCoins
  if (player["pCoins"] < 0) player["pCoins"] = 0
}

// Location space handlers

function locComedyClub() {

}

// Event space handlers

function surShadyShop() {
  
}
