class Ship {
  constructor(len, name, location, delta, iconSrc) {
    this.len = len;
    this.name = name;
    this.location = location;
    this.delta = delta;
    this.hitSquares = [];
    this.iconSrc = iconSrc;
  }

  isSunk(board) {
    const x = this.location[0];
    const y = this.location[1];
    const dx = this.delta[0];
    const dy = this.delta[1];

    for (let i = 0; i < this.len; i++) {
      if (board.grid[x + dx * i][y + dy * i] === "ship") {
        return false;
      }
    }
    return true;
  }
}

module.exports = Ship;
