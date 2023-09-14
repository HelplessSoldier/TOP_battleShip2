const GameBoard = require("../gameBoard");
const canAddShip = require("./canAddShip");

let testBoard;
beforeEach(() => {
  testBoard = new GameBoard(10, 10);
});

test("works on the edge of board", () => {
  expect(
    canAddShip(
      testBoard.height,
      testBoard.width,
      [9, 9],
      [-1, 0],
      4,
      testBoard.grid
    )
  ).toBe(true);
});

test("catches oob", () => {
  expect(
    canAddShip(
      testBoard.height,
      testBoard.width,
      [9, 9],
      [1, 0],
      2,
      testBoard.grid
    )
  ).toBe(false);
});
