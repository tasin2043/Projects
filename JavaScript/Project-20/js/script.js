window.onload = function () {
  main();
};

// Globals
let result = 0;

function main() {
  const output = document.getElementById("output");
  const incrementBtn = document.getElementById("increment-btn");
  const incrementInput = document.getElementById("increment-input");
  const decrementBtn = document.getElementById("decrement-btn");
  const decrementInput = document.getElementById("decrement-input");

  displayResult(output);
  // listeners
  incrementBtn.addEventListener("click", function () {
    const increment = parseInt(incrementInput.value);
    result += increment;
    displayResult(output);
  });
  decrementBtn.addEventListener("click", function () {
    const decrement = parseInt(decrementInput.value);
    result -= decrement;
    displayResult(output);
  });
  incrementInput.addEventListener("keyup", handleInput);
  decrementInput.addEventListener("keyup", handleInput);
}

//   handlers
function handleInput(e) {
  if (parseInt(e.target.value) > 100) {
    e.target.value = 100;
  }
  if (parseInt(e.target.value) < 0) {
    e.target.value = 100;
  }
}

function displayResult() {
  if (result < 0) {
    result = 0;
    alert("Result can not be Negative!!");
  }
  let finalResult = result;
  if (result < 10) {
    finalResult = `0${result}`;
  }
  output.innerText = finalResult;
}
