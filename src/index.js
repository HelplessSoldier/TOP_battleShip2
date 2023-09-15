import("./style.css");
const renderPlayerNamePage = require("./pages/playerNamePage");
const Game = require("./classes/game");
const renderSetupPage = require("./pages/boardSetupPage");

const root = document.getElementById("content");
root.classList.add("userNamePage");

startGame();

async function startGame() {
  try {
    const playerName = await renderPlayerNamePage(root);
    const game = new Game(playerName, "Computer");
    root.innerHTML = "";
    root.classList.remove("userNamePage");

    renderSetupPage(game, root);
  } catch (error) {
    console.error("Error: ", error);
  }
}
