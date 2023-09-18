class CpuPlayer {
  constructor(name, game) {
    this.name = name;
    this.ships = game.getDefaultShipList();
  }
}

module.exports = CpuPlayer;
