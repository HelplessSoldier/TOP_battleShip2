class Player {
  constructor(name, game) {
    this.name = name;
    this.ships = game.getDefaultShipList();
  }
}

module.exports = Player;
