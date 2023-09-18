function sunkCheckEnemy(game) {
  console.log("oh hi!");
  const ships = game.cpu.ships;
  for (let ship of ships) {
    if (ship.isSunk(game.cpuBoard)) {
      game.cpuBoard.sinkShip(ship);
    }
  }

}

module.exports = sunkCheckEnemy;
