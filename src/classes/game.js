const Player = require("./player");
const CpuPlayer = require("./cpuPlayer");
const GameBoard = require("./gameBoard");
const Ship = require("./ship");

class Game {
  constructor(playerName, cpuName) {
    this.player = new Player(playerName);
    this.cpu = new CpuPlayer(cpuName);
    this.playerBoard = new GameBoard(10, 10, "empty");
    this.cpuBoard = new GameBoard(10, 10, "empty");
  }

  getDefaultShipList() {
    const carrier = new Ship(5, "Carrier", null, null);
    const battleship = new Ship(4, "Battleship", null, null);
    const destroyer = new Ship(3, "Destroyer", null, null);
    const submarine = new Ship(3, "Submarine", null, null);
    const patrol = new Ship(2, "Patrol", null, null);
    const shipList = [carrier, battleship, destroyer, submarine, patrol];
    return shipList;
  }
}

module.exports = Game;
