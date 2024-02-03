/**
 * Project-7
 * Change the background color by clicking and generating hex random color
 * Also display a hex code to disable field
 * Add a button to copy the color code
 * Activate Toast message
 * create a dynamic toast message
 * clear toast message
 */

let div = null;
// step-1 : create onload handler
window.onload = () => {
  main();
};

function main() {
  const container = document.querySelector(".container");
  const output = document.getElementById("output");
  const copyBtn = document.querySelector(".copyBtn");
  const clickBtn = document.querySelector(".clickBtn");

  clickBtn.addEventListener("click", function () {
    const bgColor = generateHexColor();
    container.style.backgroundColor = bgColor;
    output.value = bgColor;
  });

  copyBtn.addEventListener("click", function () {
    navigator.clipboard.writeText(output.value);
    if (div !== null) {
      div.remove();
    }
    generateToastMessage(`${output.value} copied`);
  });
}

// step-2 : generate hex color code randomly
function generateHexColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

function generateToastMessage(msg) {
  div = document.createElement("div");
  div.innerText = msg;
  div.className = "toast-message toast-message-slide-in";

  div.addEventListener("click", function () {
    div.classList.remove("toast-message-slide-in");
    div.classList.add("toast-message-slide-out");

    div.addEventListener("animationend", function () {
      div.remove();
      div = null;
    });
  });

  document.body.appendChild(div);
}
