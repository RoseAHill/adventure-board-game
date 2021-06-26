# APtBG Pseudo-code

## Game Breakdown

AtMtBG is a multiplayer hotseat board game.

## MVP

- Win condition:
  - A user hits square exactly 50
- Loose condition:
  - Not a winner

- Game Mechanics:
  - Place on board (squares)
  - Coins

- Game Start:
  - User specifies player count (3-6)
- Turn Phases:
  - User rolls 6-sided dice and moves forward
  - Game determines turn type:
    - Location: Optional events
      - Train Station: Can buy spaces with coins
      - Trading booth: Can buy coins with spaces
    - Surprises: Mandatory events
      - Shady Shopkeeper's Dicey Business: Hey kid, wanna buy some dice? Loose lots of coins, roll 2 more dice
      - Surprise Cruise Party: Go forward 6 spaces but loose coins
      - Birthday Party: Invite people to your party, you and everyone you invite gets put 3 squares ahead of you, and they all give you coins
      - Holiday Party: Everyone is invited, everyone gains coins
      - Tornado: Everyone swaps places
    - Challenges: Other players decide if you win or loose. Win adds squares, Loose removes squares, tie you stay there
      - Song Association: Pick a player, that player says a random word. You have 5 seconds to name a song related to that word. Other players vote on if you did well enough
      - Flash Genre Quiz: A random player names a genre. You have 10 seconds to name a song in that genre.
      - Lyrics Genius: Pick a player, they have to name a popular song they know you've heard. You must sing or say a line or two from i
      - Word Association: You vs the rest of the players. Other players take turns to say a random word, you have 5 seconds to say word related to that word. If you get 5 within 30 seconds you win, otherwise you loose.

## Past MVP

- Win condition:
  - /100/150
  - A user buys the Flaming Raging Poisonous Sword of Doom
- Loose condition:
  - Looses all lives

- Game Mechanics:
  - Lives
  - Items

- Game Start:
  - User is shown their ability load-out
    - 1 turn ability
    - 1 out-of-turn ability
    - 1 trait
- Turn Phases:
  - Effect Phase: Any effects get resolved
  - Game rolls between different turn types
    - Location: Optional events
      - Hospital: Can buy lives with coins
      - Black Market: Can hire a hitman on other players to take out players' lives or spaces
      - Alleyway: Can bribe a thief to steal coins from a player, random chance to get a cut
    - Events:
      - Surprise Cruise: + Can bring someone with you
      - Beach Vacation: Looses a turn, gain a life, cant be effected by anything
    - Challenges:
      - Song Association: + computer chooses random word
      - Song Roulette: Pick a genre, the computer picks a song and plays it. Player tries to guess what the title or artist is.

## Back-burner Features

- Different classes/ability loadouts players can choose from
