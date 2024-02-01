/**
 * Project-6
 * Change the background color by clicking and generating rgb random color
 */

// step-1 : onload event
window.onload = () => {
  main();
};

function main() {
  const container = document.querySelector(".container");
  const btn = document.querySelector(".btn");

  btn.addEventListener("click", function () {
    const bgColor = generateRGBColor();

    container.style.backgroundColor = bgColor;
  });
}

// step-2 : generate random number
function generateRGBColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgb(${red},${green},${blue})`;
}

// step-3 : collect all nessecary referances
