const Player = require("./player");
const CpuPlayer = require("./cpuPlayer");
const GameBoard = require("./gameBoard");
const Ship = require("./ship");
const canAddShip = require("../classes/gameBoardFunctions/canAddShip");

const submarineIconPath = require("../assets/submarine-svgrepo-com.svg");
const battleshipIconPath = require("../assets/cruiser-military-svgrepo-com.svg");
const destroyerIconPath = require("../assets/boat-collection-filled-svgrepo-com.svg");
const carrierIconPath = require("../assets/1540235856.svg");
const patrolIconPath = require("../assets/4047322-boat-harbour-seagoing-ship-tug-tugboat-tugboats_113549.svg");

class Game {
  constructor(playerName, cpuName) {
    this.player = new Player(playerName, this);
    this.cpu = new CpuPlayer(cpuName, this);
    this.playerBoard = new GameBoard(10, 10, "empty");
    this.cpuBoard = new GameBoard(10, 10, "empty");
    this.generateRandomBoard(this.cpuBoard, this.cpu);
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

  generateRandomBoard(board, player) {
    for (let i = 0; i < board.height; i++) {
      for (let j = 0; j < board.width; j++) {
        board.grid[i][j] === board.fill;
      }
    }

    const ships = player.ships;
    for (let ship of ships) {
      board.removeShip(ship);
      const [location, delta] = pickRandom(board, ship);
      ship.location = location;
      ship.delta = delta;
      board.addShip(ship);
    }
  }
}

function pickRandom(board, ship) {
  x = Math.floor(Math.random() * board.height);
  y = Math.floor(Math.random() * board.width);
  delta = (Math.random() > 0.5) ? [1, 0] : [0, 1];
  if (canAddShip(board.height, board.width, [x, y], delta, ship.len, board.grid)) {
    return [[x, y], delta];
  } else {
    return pickRandom(board, ship);
  }
}

module.exports = Game;
