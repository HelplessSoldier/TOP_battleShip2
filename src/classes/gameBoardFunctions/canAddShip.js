function canAddShip(boardHeight, boardWidth, location, delta, length) {
  const x = location[0];
  const y = location[1];
  const dx = delta[0];
  const dy = delta[1];

  let currentSquare = [-1, -1];
  for (let i = 0; i < length; i++) {
    currentSquare[0] = x + dx * i;
    currentSquare[1] = y + dy * i;
    if (
      currentSquare[0] >= boardHeight ||
      currentSquare[1] >= boardWidth ||
      currentSquare[0] < 0 ||
      currentSquare[1] < 0
    ) {
      return false;
    }
  }
  return true;
}

module.exports = canAddShip;
