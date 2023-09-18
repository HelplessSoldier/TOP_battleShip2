const createElement = require("../helpers/createElement");

function renderGamePage(game, parent) {
  parent.innerHTML = "";
  const boardsContainer = createElement("div", { id: "boardsContainer" });

  let running = true;
  function renderBoards() {
    boardsContainer.innerHTML = ""

    const playerBoardContainer = createElement("div", { id: "playerBoardContainer" });
    const playerShipsVisible = true;
    const playerBoard = game.playerBoard.renderSelfGameplay(playerShipsVisible, true);
    playerBoardContainer.append(playerBoard);

    const cpuBoardContainer = createElement("div", { id: "cpuBoardContainer" });
    const cpuShipsVisible = false;
    const cpuBoard = game.cpuBoard.renderSelfGameplay(cpuShipsVisible, false);
    cpuBoardContainer.append(cpuBoard);

    boardsContainer.append(playerBoardContainer, cpuBoardContainer);

    if (running) {
      requestAnimationFrame(renderBoards);
    }
  }

  renderBoards();

  parent.append(boardsContainer);
}

module.exports = renderGamePage;
