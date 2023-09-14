const createElement = require("../helpers/createElement");

function renderSetupPage(game, root) {
  let selectedShip = null;
  let lastSelected = null;

  game.playerBoard.renderSelf(root);
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
  root.append(shipSelectionContainer);
}

module.exports = renderSetupPage;
