const canAddShip = require("./canAddShip");

test("works on the edge of board", () => {
  expect(canAddShip(10, 10, [9, 9], [-1, 0], 4)).toBe(true);
});

test("catches oob", () => {
  expect(canAddShip(10, 10, [9, 9], [1, 0], 2)).toBe(false);
});
