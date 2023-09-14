const createElement = require("../helpers/createElement");

function renderSetupPage(game, root) {
  root.classList.add("setupPage");
  let selectedShip = null;
  let lastSelected = null;

  let boardAndSelectionContainer = createElement("div", { id: "boardAndSelectionContainer" });

  // ship direction buttons ------------------------------------------------------------------------
  let currentDelta = [1, 0];

  const directionButtonsContainer = createElement("div", { id: "directionButtonsContainer" });

  const verticalButton = createElement("button", { id: "directionVerticalButton" }, "Vertical");

  const horizontalButton = createElement(
    "button",
    { id: "directionHorizontalButton" },
    "Horizontal"
  );

  directionButtonsContainer.append(verticalButton, horizontalButton);

  // board -----------------------------------------------------------------------------------------
  game.playerBoard.renderSelf(boardAndSelectionContainer);

  // ship selection --------------------------------------------------------------------------------
  const defaultShipList = game.getDefaultShipList();

  const shipSelectionContainer = createElement("div", {
    id: "shipSelectionContainer",
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
      src: ship.iconSrc,
    });

    const shipName = createElement("p", { class: "shipName" }, ship.name);

    shipContainer.append(shipIcon, shipName);
    shipSelectionContainer.append(shipContainer);
  }
  boardAndSelectionContainer.append(shipSelectionContainer);
  root.append(directionButtonsContainer, boardAndSelectionContainer);
}

module.exports = renderSetupPage;
