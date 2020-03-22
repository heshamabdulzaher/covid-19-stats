import { allCountriesList } from './countries.js';
// console.log(allCountriesList);
window.onload = async function() {
  await GetGeneralStats();
  await GetCountriesStats();
  await fireHoverAnimation();
};

let countriesStats;

async function GetGeneralStats(api) {
  let res = await fetch('/assets/js/all.json');
  let data = await res.json();
  let generalStatsContainer = document.querySelector('.general-stats');
  generalStatsContainer.innerHTML = `
  <div>All cases ${data.cases.toLocaleString()}</div>
  <div class="divider"></div>
  <div style="color: red;">Death ${data.deaths.toLocaleString()}</div>
  <div class="divider"></div>
  <div style="color: #09d009">Recovered ${data.recovered.toLocaleString()}</div>
  `;
  return data;
}
async function GetCountriesStats(api) {
  let res = await fetch('/assets/js/countries.json');
  let data = await res.json();
  data.map(country => {
    let matchedCountry = allCountriesList.find(
      itm =>
        (itm.name.toLowerCase() === country.country.toLowerCase()) |
        (itm.code.toLowerCase() === country.country.toLowerCase())
    );
    if (matchedCountry) {
      country.code = matchedCountry.code;
    }
  });
  countriesStats = data;
  console.log(countriesStats);
  return data;
}

// Render country details card on hover animation
function fireHoverAnimation() {
  const countriesSVG = document.querySelectorAll(
    '.world-map-container svg path'
  );
  const detailCard = document.querySelector('.detail-card');
  //   console.log(countriesSVG);
  countriesSVG.forEach(countryPath => {
    countryPath.addEventListener('mouseover', e => {
      let countryData = countriesStats.find(itm => itm.code === e.target.id);
      detailCard.classList.remove('show');
      if (countryData) {
        detailCard.classList.add('show');
        detailCard.innerHTML = `
          <div class="country-name">${countryData.country.toLocaleString()}</div>
          <div class="stats">
            <div>All cases ${countryData.cases.toLocaleString()}</div>
            <div style="color: red">Death ${countryData.deaths.toLocaleString()}</div>
            <div style="color: #09d009">Recovered ${countryData.recovered.toLocaleString()}</div>
          </div>`;
      }
    });
    countryPath.addEventListener('mouseleave', e => {
      detailCard.classList.remove('show');
    });
  });
}

function rederDetailCard() {}
