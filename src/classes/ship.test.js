const Ship = require("./ship");
const GameBoard = require("./gameBoard");

let testBoard;
let testShip;
beforeEach(() => {
  testBoard = new GameBoard(5, 5);
  testShip = new Ship(2, "testBoi", [0, 0], [1, 0]);
});

test("is sunk returns true when ship has 0 hp", () => {
  testBoard.addShip(testShip);
  testBoard.receiveAttack([0, 0]);
  testBoard.receiveAttack([1, 0]);
  expect(testShip.isSunk(testBoard)).toBe(true);
});

test("isn't sunk if no hits", () => {
  testBoard.addShip(testShip);
  expect(testShip.isSunk(testBoard)).toBe(false);
});

test("isn't sunk if has hp", () => {
  testBoard.addShip(testShip);
  testBoard.receiveAttack([0, 0]);
  expect(testShip.isSunk(testBoard)).toBe(false);
});
