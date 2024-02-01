/**
 * Project-6
 * Change the background color by clicking and generating hex random color
 * Also display a hex code to disable field
 */

// step-1 : create onload handler
window.onload = () => {
  main();
};

function main() {
  const container = document.querySelector(".container");
  const btn = document.querySelector(".btn");
  const output = document.getElementById("output");

  btn.addEventListener("click", function () {
    const bgColor = hexColorGenerator();
    container.style.backgroundColor = bgColor;
    output.value = hexColorGenerator();
  });
}

// step-2 : random color generator function
// hex color code: #000000

function hexColorGenerator() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

// step-3 :  collect all nessecary referance
// inside function
