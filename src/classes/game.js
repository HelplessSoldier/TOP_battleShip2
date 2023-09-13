const Player = require("./player");
const CpuPlayer = require("./cpuPlayer");

class Game {
  constructor(playerName, cpuName) {
    this.player = new Player(playerName);
    this.cpu = new CpuPlayer(cpuName);
  }
}

module.exports = Game;
