window.onload = function () {
  main();
};

function main() {
  const resetBtn = document.getElementById("reset-btn");
  const submitBtn = document.getElementById("submit-btn");
  const nameInput = document.getElementById("name-inp");
  const nameOutput = document.getElementById("name-output");
  const resultBody = document.getElementById("result-body");

  resultBody.style.display = "none";

  resetBtn.addEventListener("click", function () {
    nameInput.value = "";
    resultBody.style.display = "none";
  });

  submitBtn.addEventListener("click", function () {
    const name = nameInput.value;

    if (!name) {
      alert("Please provide a valid name!");
    } else {
      resultBody.style.display = "block";
      nameOutput.innerHTML = name;
      nameInput.value = "";
    }
  });
}
