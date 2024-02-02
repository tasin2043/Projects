/**
 * Project-7
 * Change the background color by clicking and generating hex random color
 * Also display a hex code to disable field
 * Add a button to copy the color code
 */

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
  });
}

// step-2 : Generate hex coded color

const generateHexColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
};
