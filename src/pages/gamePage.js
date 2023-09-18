const createElement = require("../helpers/createElement");

function renderGamePage(game, parent) {
  parent.innerHTML = "";
  const boardsContainer = createElement("div", { id: "boardsContainer" });

  let running = true;
  function renderBoards() {
    boardsContainer.innerHTML = ""

    const playerBoardContainer = createElement("div", { id: "playerBoardContainer" });
    const playerNameText = game.player.name;
    const playerTitleBar = createElement("h2", { class: "boardTitle" }, playerNameText);
    const playerBoard = game.playerBoard.renderSelfGameplay(true, game);
    playerBoardContainer.append(playerTitleBar, playerBoard);

    const cpuBoardContainer = createElement("div", { id: "cpuBoardContainer" });
    const cpuNameText = game.cpu.name;
    const cpuTitleBar = createElement("h2", { class: "boardTitle" }, cpuNameText);
    const cpuBoard = game.cpuBoard.renderSelfGameplay(false, game);
    cpuBoardContainer.append(cpuTitleBar, cpuBoard);

    boardsContainer.append(playerBoardContainer, cpuBoardContainer);

    if (running) {
      requestAnimationFrame(renderBoards);
    }
  }

  renderBoards(parent);

  parent.append(boardsContainer);
}

module.exports = renderGamePage;
