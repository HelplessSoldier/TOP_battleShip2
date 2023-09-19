function sunkCheckEnemy(game) {
  const ships = game.cpu.ships;
  for (let ship of ships) {
    if (ship.isSunk(game.cpuBoard)) {
      game.cpuBoard.sinkShip(ship);
    }
  }

}

module.exports = sunkCheckEnemy;
