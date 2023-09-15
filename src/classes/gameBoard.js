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
    this.preview = "preview";
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

    if (canAddShip(this.height, this.width, ship.location, ship.delta, ship.len, this.grid)) {
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

  renderSelf(shipsVisible, selectedShip, currentDelta) {
    const boardContainer = createElement("div", { class: "boardContainer" });

    for (let i = 0; i < this.height; i++) {
      const rowElement = createElement("div", { class: "row" });

      for (let j = 0; j < this.width; j++) {
        const cellElement = createElement("div", { class: "cell" });

        cellElement.addEventListener("mousedown", () => {
          selectedShip.delta = currentDelta;
          selectedShip.location = [i, j];
          console.log(`location: ${selectedShip.location} delta: ${selectedShip.delta}`);
          if (
            canAddShip(
              this.height,
              this.width,
              selectedShip.location,
              selectedShip.delta,
              selectedShip.len,
              this.grid
            )
          ) {
            console.log(`adding ship: ${selectedShip}`);
            this.addShip(selectedShip);
          }
        });

        cellElement.addEventListener("mouseover", () => {
          if (
            selectedShip !== null &&
            canAddShip(this.height, this.width, [i, j], currentDelta, selectedShip.len, this.grid)
          ) {
            this._previewHighlight(selectedShip, currentDelta, i, j);
          }
        });

        if (this.grid[i][j] === "preview") {
          cellElement.style.backgroundColor = "red";
        }

        if (this.grid[i][j] === this.shipSquare && shipsVisible) {
          cellElement.style.backgroundColor = "orange";
        }

        rowElement.append(cellElement);
      }
      boardContainer.append(rowElement);
    }
    return boardContainer;
  }

  _previewHighlight(selectedShip, currentDelta, x, y) {
    this._clearPreview();
    for (let i = 0; i < selectedShip.len; i++) {
      this.grid[currentDelta[0] * i + x][currentDelta[1] * i + y] = this.preview;
    }
  }

  _clearPreview() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.grid[i][j] === this.preview) {
          this.grid[i][j] = this.fill;
        }
      }
    }
  }
}

module.exports = GameBoard;
