const createElement = require("../helpers/createElement");
const allShipsUsed = require("./boardSetupFunctions/allShipsUsed");
const xSvg = require("../assets/x-symbol-svgrepo-com.svg");
const renderGamePage = require("./gamePage");

function renderSetupPage(game, root) {
  root.classList.add("setupPage");
  let selectedShip = null;
  let lastSelected = null;

  let boardAndSelectionContainer = createElement("div", {
    id: "boardAndSelectionContainer"
  });

  // ship direction buttons ------------------------------------------------------------------------
  let currentDelta = [1, 0];

  const directionButtonsContainer = createElement("div", {
    id: "directionButtonsContainer"
  });

  const verticalButton = createElement("button", { id: "directionVerticalButton" }, "Vertical");
  verticalButton.addEventListener("click", () => {
    currentDelta = [1, 0];
  });

  const horizontalButton = createElement(
    "button",
    { id: "directionHorizontalButton" },
    "Horizontal"
  );
  horizontalButton.addEventListener("click", () => {
    currentDelta = [0, 1];
  });

  directionButtonsContainer.append(verticalButton, horizontalButton);

  // board -----------------------------------------------------------------------------------------
  const gameBoardContainer = createElement("div", { id: "gameBoardContainer" });
  let running = true;

  function updateBoard() {
    gameBoardContainer.innerHTML = "";

    const gameBoardElement = game.playerBoard.renderSelfSetup(true, selectedShip, currentDelta);
    gameBoardContainer.append(gameBoardElement);

    if (running) {
      requestAnimationFrame(updateBoard);
    }
  }

  updateBoard();

  // ship selection --------------------------------------------------------------------------------
  const defaultShipList = game.player.ships;

  const shipSelectionContainer = createElement("div", {
    id: "shipSelectionContainer"
  });

  for (let ship of defaultShipList) {
    const shipAndRemoveButtonContainer = createElement("div", {
      class: "shipAndRemoveButtonContainer"
    });
    const shipContainer = createElement("div", { class: "shipContainer" });

    shipContainer.addEventListener("click", () => {
      selectedShip = ship;
      if (lastSelected !== null) {
        lastSelected.style.backgroundColor = "rgb(34, 34, 34)";
      }
      lastSelected = shipContainer;
      shipContainer.style.backgroundColor = "#FFFFFF";
    });

    const shipIcon = createElement("img", {
      class: "shipIcon",
      src: ship.iconSrc
    });

    const shipName = createElement("p", { class: "shipName" }, ship.name);

    const removeShipButton = createElement("img", { class: "removeShipButton", src: xSvg });
    removeShipButton.addEventListener("click", () => {
      removeShipButton.style.maxWidth = "13px";
      game.playerBoard.removeShip(ship);
      setTimeout(() => {
        removeShipButton.style.maxWidth = "21px";
      }, 55);
    });

    shipContainer.append(shipIcon, shipName);
    shipAndRemoveButtonContainer.append(shipContainer, removeShipButton);
    shipSelectionContainer.append(shipAndRemoveButtonContainer);
  }
  boardAndSelectionContainer.append(gameBoardContainer, shipSelectionContainer);

  // randomize and complete button ----------------------------------------------------------------
  const bottomButtonsContainer = createElement("div", { id: "bottomButtonsContainer" });

  const randomizeButton = createElement("button", { id: "randomizeButton" }, "Randomize!");

  randomizeButton.addEventListener("click", () => {
    game.generateRandomBoard(game.playerBoard, game.player);
  });

  const submitButton = createElement("button", { id: "setupSubmitButton" }, "Finished");
  const unfilledMessage = createElement(
    "h2",
    { id: "unfilledMessage" },
    "Please place all ships. One or more are missing"
  );

  submitButton.addEventListener("click", () => {
    if (allShipsUsed(defaultShipList)) {
      renderGamePage(game, root);
    } else {
      root.append(unfilledMessage);
    }
  });

  bottomButtonsContainer.append(randomizeButton, submitButton);
  root.append(directionButtonsContainer, boardAndSelectionContainer, bottomButtonsContainer);
}

module.exports = renderSetupPage;
