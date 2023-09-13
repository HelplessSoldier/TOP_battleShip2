const GameBoard = require("./gameBoard");
const Ship = require("./ship");

let testBoard;
beforeEach(() => {
  testBoard = new GameBoard(3, 3);
});

test("attacks are functioning", () => {
  testBoard.receiveAttack([0, 0]);
  expect(testBoard.grid).toEqual([
    ["impact", "empty", "empty"],
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
  ]);
});

test("can add ship", () => {
  const testShip = new Ship(2, "testBoi");
  testBoard.addShip(testShip, [0, 2], [1, 0]);
  expect(testBoard.grid).toEqual([
    ["empty", "empty", "ship"],
    ["empty", "empty", "ship"],
    ["empty", "empty", "empty"],
  ]);
});
