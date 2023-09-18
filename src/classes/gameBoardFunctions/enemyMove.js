function enemyMove(game) {
  let x = Math.floor(Math.random() * game.playerBoard.height);
  let y = Math.floor(Math.random() * game.playerBoard.width);
  const impactSquare = game.playerBoard.impact;
  const hitSquare = game.playerBoard.hitShip

  if (game.playerBoard.grid[x][y] !== impactSquare && game.playerBoard.grid[x][y] !== hitSquare) {
    game.playerBoard.receiveAttack([x, y]);
  } else {
    enemyMove(game);
  }
}

function smarterEnemyMoves(game) {
  const width = game.playerBoard.width;
  const height = game.playerBoard.height;
  const grid = game.playerBoard.grid;
  const hitShip = game.playerBoard.hitShip;
  const fill = game.playerBoard.fill;
  const ship = game.playerBoard.shipSquare;

  const searchDeltas = [[1, 0], [0, 1], [-1, 0], [0, -1]];

  // Search for a hit ship on the board
  let shipIdx = [-1, -1];
  let searchDirection = [0, 0];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] === hitShip) {

        // Check surrounding cells for a hit ship
        for (let delta of searchDeltas) {
          const newX = i + delta[0];
          const newY = j + delta[1];

          if (newX >= 0 && newX < height && newY >= 0 && newY < width && grid[newX][newY] === hitShip) {
            searchDirection = delta;
            shipIdx = [i, j];
            break;
          }
        }

        searchDirection = searchDeltas[Math.floor(Math.random() * 4)];
        shipIdx = [i, j];
        break;
      }
    }
    if (searchDirection[0] !== 0 || searchDirection[1] !== 0) {
      break;
    }
  }

  if (shipIdx[0] === -1 && shipIdx[1] === -1) {
    // No hit ship found, perform a random move
    enemyMove(game);
    return;
  }

  // Move in the searchDirection until an empty cell is found
  let x = shipIdx[0] + searchDirection[0];
  let y = shipIdx[1] + searchDirection[1];

  while (x >= 0 && x < height && y >= 0 && y < width && grid[x][y] === hitShip) {
    x += searchDirection[0];
    y += searchDirection[1];
  }

  if (x >= 0 && x < height && y >= 0 && y < width &&
    (grid[x][y] === fill || grid[x][y] === ship)) {
    // Valid move, attack the cell
    game.playerBoard.receiveAttack([x, y]);
  } else {
    // Invalid move, perform a random move
    enemyMove(game);
  }
}

module.exports = smarterEnemyMoves;

