const create2dArray = require("./gameBoardFunctions/create2dArray");
const canAddShip = require("./gameBoardFunctions/canAddShip");
const createElement = require("../helpers/createElement");
const enemyMove = require("./gameBoardFunctions/enemyMove");
const sunkCheck = require("./gameBoardFunctions/sunkCheck");
const renderWinnderPage = require("../pages/winnerPage");
const renderWinnerPage = require("../pages/winnerPage");

class GameBoard {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.fill = "empty";
    this.impact = "impact";
    this.shipSquare = "ship";
    this.hitShip = "hitShip";
    this.preview = "preview";
    this.sunkShip = "sunkShip";
    this.grid = create2dArray(width, height, this.fill);
    this.addedShips = [];
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

  sinkShip(ship) {
    const x = ship.location[0];
    const y = ship.location[1];
    const dx = ship.delta[0];
    const dy = ship.delta[1];

    for (let i = 0; i < ship.len; i++) {
      this.grid[x + (i * dx)][y + (i * dy)] = this.sunkShip;
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
      this.addedShips.push(ship);
    }
  }

  removeShip(ship) {
    if (ship.location === null) {
      return;
    }

    const x = ship.location[0];
    const y = ship.location[1];
    const dx = ship.delta[0];
    const dy = ship.delta[1];

    for (let i = 0; i < ship.len; i++) {
      this.grid[x + dx * i][y + dy * i] = this.fill;
    }

    const indexToRemove = this.addedShips.findIndex(
      existingShip => existingShip.name === ship.name
    );

    if (indexToRemove !== -1) {
      this.addedShips.splice(indexToRemove, 1);
    }

    ship.location = null;
    ship.delta = null;
  }

  hasAliveShips(board) {
    for (let row of board) {
      for (let cell of row) {
        if (cell === this.shipSquare) {
          return true;
        }
      }
    }
    return false;
  }

  renderSelfSetup(shipsVisible, selectedShip, currentDelta) {
    const boardContainer = createElement("div", { class: "boardContainer" });

    for (let i = 0; i < this.height; i++) {
      const rowElement = createElement("div", { class: "row" });

      for (let j = 0; j < this.width; j++) {
        const cellElement = createElement("div", { class: "cell" });

        cellElement.addEventListener("mousedown", () => {
          selectedShip.delta = currentDelta;
          selectedShip.location = [i, j];
          if (
            canAddShip(
              this.height,
              this.width,
              selectedShip.location,
              selectedShip.delta,
              selectedShip.len,
              this.grid
            ) &&
            !this._inAddedShips(selectedShip)
          ) {
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

        if (this.grid[i][j] === this.sunkShip) {
          cellElement.style.backgroundColor = "black";
        }

        rowElement.append(cellElement);
      }
      boardContainer.append(rowElement);
    }
    return boardContainer;
  }

  renderSelfGameplay(isPlayer, game) {

    const boardContainer = createElement("div", { class: "gameplayBoardContainer" });

    for (let i = 0; i < this.height; i++) {
      const rowElement = createElement("div", { class: "row" });

      for (let j = 0; j < this.width; j++) {
        const cellElement = createElement("div", { class: "cell" });
        let squareValue = this.grid[i][j];

        if (isPlayer) {
          if (squareValue === this.shipSquare) {
            cellElement.style.backgroundColor = "orange";
          }
        }

        if (!isPlayer) {
          cellElement.addEventListener("mouseover", () => {
            if (squareValue !== this.hitShip && squareValue !== this.impact && squareValue !== this.sunkShip) {
              cellElement.style.backgroundColor = "#fffb29";
            }
          });

          cellElement.addEventListener("mousedown", () => {
            squareValue = this.grid[i][j];
            if (squareValue !== this.hitShip && squareValue !== this.impact && squareValue !== this.sunkShip) {

              this.receiveAttack([i, j]);
              sunkCheck(game);

              if (!this.hasAliveShips(game.cpuBoard.grid)) {
                let winnerEvent = new Event("winnerPlayer");
                document.dispatchEvent(winnerEvent);
              }

              enemyMove(game);
              if (!this.hasAliveShips(game.playerBoard.grid)) {
                let winnerEvent = new Event("winnerCpu");
                document.dispatchEvent(winnerEvent);
              }
            }
          });
        }

        if (squareValue === this.impact) {
          cellElement.style.backgroundColor = "#20509e";
        }

        if (squareValue === this.hitShip) {
          cellElement.style.backgroundColor = "red";
        }

        if (squareValue === this.sunkShip) {
          cellElement.style.backgroundColor = "orange";
        }

        rowElement.append(cellElement);
      }
      boardContainer.append(rowElement);
    }
    return boardContainer
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

  _inAddedShips(addAttemptShip) {
    for (let ship of this.addedShips) {
      if (ship.name === addAttemptShip.name) {
        return true;
      }
    }
    return false;
  }
}

module.exports = GameBoard;
