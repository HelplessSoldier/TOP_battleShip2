const create2dArray = require("./create2dArray");

test("creates an array", () => {
  expect(create2dArray(3, 3, false)).toEqual([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);
});

test("creates the correct aspect ratio", () => {
  expect(create2dArray(2, 3, true)).toEqual([
    [true, true],
    [true, true],
    [true, true],
  ]);
});
