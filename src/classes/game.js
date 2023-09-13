const Player = require("./player");
const CpuPlayer = require("./cpuPlayer");
const GameBoard = require("./gameBoard");

class Game {
  constructor(playerName, cpuName) {
    this.player = new Player(playerName);
    this.cpu = new CpuPlayer(cpuName);
    this.playerBoard = new GameBoard(10, 10, "empty");
    this.cpuBoard = new GameBoard(10, 10, "empty");
  }
}

module.exports = Game;
