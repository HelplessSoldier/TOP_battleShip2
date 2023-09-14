const Player = require("./player");
const CpuPlayer = require("./cpuPlayer");
const GameBoard = require("./gameBoard");
const Ship = require("./ship");
const submarineIconPath = require("../assets/submarine-svgrepo-com.svg");
const battleshipIconPath = require("../assets/cruiser-military-svgrepo-com.svg");
const destroyerIconPath = require("../assets/boat-collection-filled-svgrepo-com.svg");
const carrierIconPath = require("../assets/1540235856.svg");
const patrolIconPath = require("../assets/4047322-boat-harbour-seagoing-ship-tug-tugboat-tugboats_113549.svg");

class Game {
  constructor(playerName, cpuName) {
    this.player = new Player(playerName);
    this.cpu = new CpuPlayer(cpuName);
    this.playerBoard = new GameBoard(10, 10, "empty");
    this.cpuBoard = new GameBoard(10, 10, "empty");
  }

  getDefaultShipList() {
    const carrier = new Ship(5, "Carrier", null, null, carrierIconPath);
    const battleship = new Ship(4, "Battleship", null, null, battleshipIconPath);
    const destroyer = new Ship(3, "Destroyer", null, null, destroyerIconPath);
    const submarine = new Ship(3, "Submarine", null, null, submarineIconPath);
    const patrol = new Ship(2, "Patrol", null, null, patrolIconPath);
    const shipList = [carrier, battleship, destroyer, submarine, patrol];
    return shipList;
  }
}

module.exports = Game;
