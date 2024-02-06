/**
 * Project-13
 * Change the background color by clicking and generating hex random color
 * Also display a hex code to disable field
 * Add a button to copy the color code
 * Activate Toast message
 * create a dynamic toast message
 * clear toast message
 * user can type their own hex code too
 * add rgb color and copy bar
 */

let div = null;
// step-1 : create onload handler
window.onload = () => {
  main();
};

function main() {
  const container = document.querySelector(".container");
  const output1 = document.getElementById("output1");
  const output2 = document.getElementById("output2");
  const copyBtn1 = document.querySelector(".copyBtn1");
  const copyBtn2 = document.querySelector(".copyBtn2");
  const clickBtn = document.querySelector(".clickBtn");

  clickBtn.addEventListener("click", function () {
    const color = generateDecimalColor();
    const hex = generateHexColor(color);
    const rgb = generateRgbColor(color);
    container.style.backgroundColor = hex && rgb;
    output1.value = hex.substring(1);
    output2.value = rgb;
  });

  copyBtn1.addEventListener("click", function () {
    navigator.clipboard.writeText(output1.value);
    if (div !== null) {
      div.remove();
    }

    if (isValidHex(output1.value)) {
      generateToastMessage(`#${output1.value} copied`);
    } else {
      alert("Invalid Color Code");
    }
  });

  copyBtn2.addEventListener("click", function () {
    navigator.clipboard.writeText(output2.value);
    if (div !== null) {
      div.remove();
    }

    if (isValidRgb(output2.value)) {
      generateToastMessage(`${output2.value} copied`);
    } else {
      alert("Invalid Color Code");
    }
  });

  output1.addEventListener("keyup", function (e) {
    const color = e.target.value;
    if (color) {
      output1.value = color.toUpperCase();
      if (isValidHex(color)) {
        container.style.backgroundColor = `#${color}`;
        output2.value = hexToRgb(color);
      }
    }
  });
}

// common function generate for decimal

function generateDecimalColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return {
    red,
    green,
    blue,
  };
}

// function generate for hex

function generateHexColor({ red, green, blue }) {
  //   const { red, green, blue } = generateDecimalColor();

  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length == 1 ? `0${hex}` : hex;
  };

  return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`.toUpperCase();
}

// function generate for rgb

function generateRgbColor({ red, green, blue }) {
  // const { red, green, blue } = generateDecimalColor();

  return `rgb(${red},${green},${blue})`;
}

// function generate for hex to rgb converter

/**
 *
 * @param {string} hex
 */
function hexToRgb(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return `rgb(${red}, ${green}, ${blue})`;
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

/**
 *
 * @param {length} color
 */
function isValidHex(color) {
  if (color.length !== 6) return false;
  //   if (color[0] !== "#") return false;
  //   color = color.substring(1);
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}

function isValidRgb(color) {
  //   if (color.length !== 255) return false;
  //   //   if (color[0] !== "#") return false;
  //   //   color = color.substring(1);
  //   return /^[0-255]{255}$/i.test(color);

  return color;
}
