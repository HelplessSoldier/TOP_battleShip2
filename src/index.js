import("./style.css");
const renderPlayerNamePage = require("./pages/playerNamePage");
const Game = require("./classes/game");
const renderSetupPage = require("./pages/boardSetupPage");
const renderWinnerPage = require("./pages/winnerPage");

const root = document.getElementById("content");
root.classList.add("userNamePage");

async function startGame() {
  try {
    const playerName = await renderPlayerNamePage(root);
    const game = new Game(playerName, "Computer");
    root.innerHTML = "";
    root.classList.remove("userNamePage");


    document.addEventListener("winnerPlayer", () => {
      let winnerName = game.player.name;
      renderWinnerPage(winnerName, root);
    })

    document.addEventListener("winnerCpu", () => {
      let winnerName = game.cpu.name;
      renderWinnerPage(winnerName, root);
    })

    renderSetupPage(game, root);
  } catch (error) {
    console.error("Error: ", error);
  }
}

startGame();
