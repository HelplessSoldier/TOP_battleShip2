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

module.exports = enemyMove;
