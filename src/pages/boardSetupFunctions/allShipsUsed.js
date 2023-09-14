function allShipsUsed(shipsList) {
  for (let ship of shipsList) {
    if (ship.location === null) {
      return false;
    }
  }
  return true;
}

module.exports = allShipsUsed;
