const createElement = require("../helpers/createElement");
const allShipsUsed = require("./boardSetupFunctions/allShipsUsed");

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
  game.playerBoard.renderSelf(boardAndSelectionContainer);

  // ship selection --------------------------------------------------------------------------------
  const defaultShipList = game.getDefaultShipList();

  const shipSelectionContainer = createElement("div", {
    id: "shipSelectionContainer"
  });

  for (let ship of defaultShipList) {
    const shipContainer = createElement("div", { class: "shipContainer" });

    shipContainer.addEventListener("click", () => {
      selectedShip = ship;
      if (lastSelected !== null) {
        lastSelected.style.backgroundColor = "rgb(34, 34, 34)";
      }
      lastSelected = shipContainer;
      shipContainer.style.backgroundColor = "#FFFFFF";
      console.log(selectedShip);
    });

    const shipIcon = createElement("img", {
      class: "shipIcon",
      src: ship.iconSrc
    });

    const shipName = createElement("p", { class: "shipName" }, ship.name);

    shipContainer.append(shipIcon, shipName);
    shipSelectionContainer.append(shipContainer);
  }
  boardAndSelectionContainer.append(shipSelectionContainer);

  // complete button -------------------------------------------------------------------------------
  const submitButton = createElement("button", { id: "setupSubmitButton" }, "Finished");
  const unfilledMessage = createElement(
    "h2",
    { id: "unfilledMessage" },
    "Please place all ships. One or more are missing"
  );
  submitButton.addEventListener("click", () => {
    if (allShipsUsed(defaultShipList)) {
      // this should go to the actual game
      console.log("hi c:");
    } else {
      root.append(unfilledMessage);
    }
  });

  root.append(directionButtonsContainer, boardAndSelectionContainer, submitButton);
}

module.exports = renderSetupPage;
