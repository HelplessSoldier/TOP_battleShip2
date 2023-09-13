const create2dArray = require("./gameBoardFunctions/create2dArray");

class GameBoard {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.grid = create2dArray(width, height, "empty");
  }
}

module.exports = GameBoard;
