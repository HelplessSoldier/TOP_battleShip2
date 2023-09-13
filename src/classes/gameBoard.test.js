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
  const testShip = new Ship(2, "testBoi", [0, 2], [1, 0]);
  testBoard.addShip(testShip);
  expect(testBoard.grid).toEqual([
    ["empty", "empty", "ship"],
    ["empty", "empty", "ship"],
    ["empty", "empty", "empty"],
  ]);
});

test("can't add ship oob", () => {
  const testShip = new Ship(2, "testBoisFriend", [0, 0], [-1, 0]);
  testBoard.addShip(testShip);
  expect(testBoard.grid).toEqual([
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
  ]);
});

test("can attack ship", () => {
  const testShip = new Ship(2, "anotherTestBoi", [0, 0], [1, 0]);
  testBoard.addShip(testShip);
  expect(testBoard.grid).toEqual([
    ["ship", "empty", "empty"],
    ["ship", "empty", "empty"],
    ["empty", "empty", "empty"],
  ]);

  testBoard.receiveAttack([1, 0]);
  expect(testBoard.grid).toEqual([
    ["ship", "empty", "empty"],
    ["hitShip", "empty", "empty"],
    ["empty", "empty", "empty"],
  ]);
});
