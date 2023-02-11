const keys = document.querySelectorAll(".key");
const resultDisplay = document.querySelector(".result-display");

keys.forEach(key => {
  key.addEventListener("click", () => {
    if (key.textContent === "=") {
      resultDisplay.textContent = eval(resultDisplay.textContent);
      return;
    }

    if (key.textContent === "C") {
      resultDisplay.textContent = 0;
      return;
    }

    if (key.textContent === "⌫") {
      resultDisplay.textContent = resultDisplay.textContent.slice(0, -1);
      return;
    }

    resultDisplay.textContent += key.textContent;
  });
});