const create2dArray = require("./gameBoardFunctions/create2dArray");
const canAddShip = require("./gameBoardFunctions/canAddShip");
const createElement = require("../helpers/createElement");

class GameBoard {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.fill = "empty";
    this.impact = "impact";
    this.shipSquare = "ship";
    this.hitShip = "hitShip";
    this.grid = create2dArray(width, height, this.fill);
  }

  receiveAttack(location) {
    const x = location[0];
    const y = location[1];

    if (this.grid[x][y] === this.shipSquare) {
      this.grid[x][y] = this.hitShip;
    } else if (this.grid[x][y] === this.fill) {
      this.grid[x][y] = this.impact;
    }
  }

  canAttackSquare(location) {
    const x = location[0];
    const y = location[1];

    if (this.grid[x][y] === this.marker || this.grid[x][y] === this.hitShip) {
      return false;
    }
    return true;
  }

  addShip(ship) {
    const x = ship.location[0];
    const y = ship.location[1];
    const dx = ship.delta[0];
    const dy = ship.delta[1];

    if (
      canAddShip(
        this.height,
        this.width,
        ship.location,
        ship.delta,
        ship.len,
        this.grid
      )
    ) {
      for (let i = 0; i < ship.len; i++) {
        this.grid[x + dx * i][y + dy * i] = this.shipSquare;
      }
    }
  }

  hasAliveShips() {
    for (let row of this.grid) {
      for (let cell of row) {
        if (cell === this.shipSquare) {
          return true;
        }
      }
    }
    return false;
  }

  renderSelf(root) {
    const boardContainer = createElement("div", { class: "boardContainer" });
    for (let row of this.grid) {
      const rowElement = createElement("div", { class: "row" });
      for (let cell of row) {
        const cellElement = createElement("div", { class: "cell" });
        rowElement.append(cellElement);
      }
      boardContainer.append(rowElement);
    }
    root.append(boardContainer);
  }
}

module.exports = GameBoard;
