import("./style.css");
const renderPlayerNamePage = require("./pages/playerNamePage");
const Game = require("./classes/game");

const root = document.getElementById("content");

startGame();

async function startGame() {
  try {
    const playerName = await renderPlayerNamePage(root);
    const game = new Game(playerName, "Computer");
    root.innerHTML = "";
    game.playerBoard.renderSelf(root);
  } catch {
    console.error("Error: ", error);
  }
}
