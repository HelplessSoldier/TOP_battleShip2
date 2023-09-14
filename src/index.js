import("./style.css");
const renderPlayerNamePage = require("./pages/playerNamePage");
const Game = require("./classes/game");

const root = document.getElementById("content");
root.classList.add("userNamePage");

startGame();

async function startGame() {
  try {
    const playerName = await renderPlayerNamePage(root);
    const game = new Game(playerName, "Computer");
    root.innerHTML = "";
    root.classList.remove("userNamePage");
    game.playerBoard.renderSelf(root);
  } catch {
    console.error("Error: ", error);
  }
}
