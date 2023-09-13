function create2dArray(width, height, fill) {
  let res = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let i = 0; i < width; i++) {
      row.push(fill);
    }
    res.push(row);
  }
  return res;
}

module.exports = create2dArray;
