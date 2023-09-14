function _isInBounds(currentSquare, boardHeight, boardWidth) {
  if (
    currentSquare[0] >= boardHeight ||
    currentSquare[1] >= boardWidth ||
    currentSquare[0] < 0 ||
    currentSquare[1] < 0
  ) {
    return false;
  }
  return true;
}

function canAddShip(boardHeight, boardWidth, location, delta, length, grid) {
  const x = location[0];
  const y = location[1];
  const dx = delta[0];
  const dy = delta[1];

  for (let i = 0; i < length; i++) {
    const currentSquareX = x + dx * i;
    const currentSquareY = y + dy * i;

    if (
      !_isInBounds([currentSquareX, currentSquareY], boardHeight, boardWidth)
    ) {
      return false;
    }

    if (grid[currentSquareX][currentSquareY] === "ship") {
      return false;
    }
  }
  return true;
}

module.exports = canAddShip;
