const root = document.getElementById("root");
const form = document.getElementById("form");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((res) => printCountries(res));

function printCountries(countries) {
  let htmlCode = "";
  countries.forEach((country) => {
    htmlCode += showHTML(country);
  });
  root.innerHTML = htmlCode;
}
function showHTML(country) {
  const { name, flags, area, maps } = country;
  const html = `
    <div>
    <h2>${name.common}</h2>
    <img src= ${flags.png}/>
    <h3>${area}</h3>
    <p>${maps.googleMaps}</p>
    </div>
    `;
  return html;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = e.target.searchBox.value;
  const searchText = text.toLowerCase();

  fetch(`https://restcountries.com/v3.1/name/${searchText}`)
    .then((res) => res.json())
    .then((res) => printCountries(res));
});
