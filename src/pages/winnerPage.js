const createElement = require("../helpers/createElement");

function renderWinnerPage(winner, parent) {
  parent.innerHTML = "";
  const winnerText = createElement("h1", { id: "winnerText" }, `${winner} won!`);
  parent.append(winnerText);
}

module.exports = renderWinnerPage;
