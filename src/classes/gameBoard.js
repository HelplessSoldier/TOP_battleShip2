const create2dArray = require("./gameBoardFunctions/create2dArray");
const canAddShip = require("./gameBoardFunctions/canAddShip");

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

  addShip(ship, location, delta) {
    const x = location[0];
    const y = location[1];
    const dx = delta[0];
    const dy = delta[1];

    if (canAddShip(this.height, this.width, location, delta, ship.len)) {
      for (let i = 0; i < ship.len; i++) {
        this.grid[x + dx * i][y + dy * i] = this.shipSquare;
      }
    }
  }
}

module.exports = GameBoard;
