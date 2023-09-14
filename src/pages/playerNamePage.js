const createElement = require("../helpers/createElement");

function renderPlayerNamePage(root) {
  return new Promise((resolve, reject) => {
    const inputContainer = createElement("div", {
      id: "usernameInputContainer",
    });

    const inputTag = createElement(
      "label",
      { id: "usernameInputLabel", for: "usernameInput" },
      "Username: "
    );

    const inputField = createElement("input", {
      id: "usernameInput",
      type: "text",
    });

    const submitButton = createElement(
      "button",
      { id: "usernameSubmitButton" },
      "Submit"
    );

    submitButton.addEventListener("click", () => {
      const playerName = inputField.value.trim();
      if (playerName.length > 0) {
        resolve(playerName);
      } else {
        reject(new Error("Player name is required"));
      }
    });

    inputContainer.append(inputTag, inputField, submitButton);
    root.append(inputContainer);
  });
}

module.exports = renderPlayerNamePage;
