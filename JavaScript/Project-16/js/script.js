/**
 * Date: 20.2.2024
 * Author: Tasin Islam
 * Description: Color picker aplications with huge don functionalities
 */

// Globals
let toastContainer = null;
const defaultColor = {
  red: 221,
  green: 222,
  blue: 238,
};

const defaultPresetColors = [
  "#865298",
  "#5C2803",
  "#9CD57A",
  "#073FD9",
  "#D18D64",
  "#04535D",
  "#63EA69",
  "#999340",
  "#FF2478",
  "#0B24A5",
  "#E37829",
  "#E94411",
  "#9CB6B7",
  "#E0D45F",
  "#13C9F1",
  "#495218",
  "#8C8195",
  "#E0D10C",
  "#6FEABA",
  "#240028",
  "#F326D5",
  "#9D5464",
  "#67E8CF",
  "#071107",
];

let customColors = new Array(24);

const copySound = new Audio("../copy-sound.wav");

// onload handler
window.onload = () => {
  main();
  updateColorCodeToDom(defaultColor);
  // display preset colors
  displayColorBoxes(
    document.getElementById("preset-colors"),
    defaultPresetColors
  );
  const customColorsString = localStorage.getItem("custom-colors");
  if (customColorsString) {
    customColors = JSON.parse(customColorsString);
    displayColorBoxes(document.getElementById("custom-colors"), customColors);
  }
};

// main or boot function, this function will take care of getting all the DOM references
function main() {
  // dom references
  const generateRandomColorBtn = document.getElementById(
    "generate-random-color"
  );
  const colorModeHexInp = document.getElementById("input-hex");
  const colorSliderRed = document.getElementById("color-slider-red");
  const colorSliderGreen = document.getElementById("color-slider-green");
  const colorSliderBlue = document.getElementById("color-slider-blue");
  const copyToClipboardBtn = document.getElementById("copy-to-clipboard");
  const saveToCustomBtn = document.getElementById("save-to-custom");
  const presetColorsParent = document.getElementById("preset-colors");
  const customColorsParent = document.getElementById("custom-colors");

  // event listeners
  generateRandomColorBtn.addEventListener(
    "click",
    handleGenerateRandomColorBtn
  );
  colorModeHexInp.addEventListener("keyup", handleColorModeHexInp);
  colorSliderRed.addEventListener(
    "change",
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  colorSliderGreen.addEventListener(
    "change",
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  colorSliderBlue.addEventListener(
    "change",
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );

  copyToClipboardBtn.addEventListener("click", handleCopyToClipboard);

  presetColorsParent.addEventListener("click", handlePresetColorParent);

  saveToCustomBtn.addEventListener(
    "click",
    handleSaveToCustomBtn(customColorsParent, colorModeHexInp)
  );
}

// event handlers
function handleGenerateRandomColorBtn() {
  const color = generateColorDecimal();
  updateColorCodeToDom(color);
}

function handleColorModeHexInp(e) {
  const hexColor = e.target.value;
  if (hexColor) {
    this.value = hexColor.toUpperCase();
    if (isValidHex(hexColor)) {
      const color = hexToDecimalColors(hexColor);
      updateColorCodeToDom(color);
    }
  }
}

function handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue) {
  return function () {
    const color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value),
    };
    updateColorCodeToDom(color);
  };
}

function handleCopyToClipboard() {
  const colorModeRadios = document.getElementsByName("color-mode");
  const mode = getCheckedValueFromRadios(colorModeRadios);
  if (mode === null) {
    throw new Error("Invalid Radio Input");
  }

  if (toastContainer !== null) {
    toastContainer.remove();
    toastContainer = null;
  }

  if (mode === "hex") {
    const hexColor = document.getElementById("input-hex").value;
    if (hexColor && isValidHex(hexColor)) {
      navigator.clipboard.writeText(`#${hexColor}`);
      generateToastMessage(`#${hexColor} Copied`);
    } else {
      alert("Invalid Hex Code");
    }
  } else {
    const rgbColor = document.getElementById("input-rgb").value;
    if (rgbColor) {
      navigator.clipboard.writeText(rgbColor);
      generateToastMessage(`${rgbColor} Copied`);
    } else {
      alert("Invalid RGB Color");
    }
  }
}

function handlePresetColorParent(event) {
  const child = event.target;
  if (child.className === "color-box") {
    navigator.clipboard.writeText(child.getAttribute("data-color"));
    copySound.play();
    copySound.volume = 0.5;
  }
}

function handleSaveToCustomBtn(customColorsParent, inputHex) {
  return function () {
    const color = `#${inputHex.value}`;
    if (customColors.includes(color)) {
      alert("Already Saved");
      return;
    }
    customColors.unshift(color);
    if (customColors.length > 24) {
      customColors = customColors.slice(0, 24);
    }
    localStorage.setItem("custom-colors", JSON.stringify(customColors));
    removeChildren(customColorsParent);
    displayColorBoxes(customColorsParent, customColors);
    copySound.play();
    copySound.volume = 0.5;
  };
}

// DOM functions
/**
 * Generate a dynamic DOM element to show a toast message
 * @param {string} msg
 */
function generateToastMessage(msg) {
  toastContainer = document.createElement("div");
  toastContainer.innerText = msg;
  toastContainer.className = "toast-message toast-message-slide-in";

  toastContainer.addEventListener("click", function () {
    toastContainer.classList.remove("toast-message-slide-in");
    toastContainer.classList.add("toast-message-slide-out");

    toastContainer.addEventListener("animationend", function () {
      toastContainer.remove();
      toastContainer = null;
    });
  });

  document.body.appendChild(toastContainer);
}

/**
 * find the checked elements from a list of radio buttons
 * @param {Array} nodes
 * @returns {string | null}
 */
function getCheckedValueFromRadios(nodes) {
  let checkedValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedValue = nodes[i].value;
      break;
    }
  }
  return checkedValue;
}

/**
 * update dom elements with calculated color values
 * @param {object} color : ;
 */
function updateColorCodeToDom(color) {
  const hexColor = generateHexColor(color);
  const rgbColor = generateRGBColor(color);

  document.getElementById(
    "color-display"
  ).style.backgroundColor = `#${hexColor}`;
  document.getElementById("input-hex").value = hexColor;
  document.getElementById("input-rgb").value = rgbColor;
  document.getElementById("color-slider-red").value = color.red;
  document.getElementById("color-slider-red-label").innerText = color.red;
  document.getElementById("color-slider-green").value = color.green;
  document.getElementById("color-slider-green-label").innerText = color.green;
  document.getElementById("color-slider-blue").value = color.blue;
  document.getElementById("color-slider-blue-label").innerText = color.blue;
}

/**
 * create a div element with class name color-box
 * @param {string} color
 * @returns {object}
 */
function generateColorBox(color) {
  const div = document.createElement("div");
  div.className = "color-box";
  div.style.backgroundColor = color;
  div.setAttribute("data-color", color);

  return div;
}

/**
 * this function will create and append new color boxes to it's parent
 * @param {object} parent
 * @param {Array} colors
 */
function displayColorBoxes(parent, colors) {
  colors.forEach((color) => {
    if (isValidHex(color.slice(1))) {
      const colorBox = generateColorBox(color);
      parent.appendChild(colorBox);
    }
  });
}

function removeChildren(parent) {
  let child = parent.lastElementChild;
  while (child) {
    parent.removeChild(child);
    child = parent.lastElementChild;
  }
}

// Utils

/**
 * generate and return an object of three color decimal values
 * @returns {object}}
 */
function generateColorDecimal() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return {
    red,
    green,
    blue,
  };
}

/**
 * take a color object of three decimal values and return a hexadecimal color code
 * @param {object} color
 * @returns {string}
 */
function generateHexColor({ red, green, blue }) {
  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`.toUpperCase();
}

/**
 * take a color object of three decimal values and return a rgb color code
 * @param {object} color
 * @returns {string}
 */
function generateRGBColor({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * convert hex color to decimal colors object
 * @param {string} hex
 * @returns {object}
 */
function hexToDecimalColors(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return {
    red,
    green,
    blue,
  };
}

/**
 * validate hex color code
 * @param {string} color;
 * @returns {boolean}
 */
function isValidHex(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}
