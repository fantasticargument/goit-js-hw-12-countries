import counryCard from '../templates/country-card'

const rfs = {
    searchCountry: document.querySelector('.js-input-country'),
    countryCard: document.querySelector('.js-card-county'),
}
let numberOfCharactersInput = 0;
var debounce = require('lodash.debounce');

rfs.searchCountry.addEventListener('input', debounce(onInputChange, 3000));

function onInputChange(event) {

    const request = event.target.value;
    console.log(numberOfCharactersInput += 1)
    console.log(request)

    // const searchQuery = request.elements.query.value;

    fetchCountry(request)
    .then(renderCountryCard)
    .catch(eve);
}

function fetchCountry(countryName){
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(response => {
        return response.json();
    })
} 

function renderCountryCard(country) {
    rfs.countryCard.innerHTML = counryCard(...country);
}

function eve() {
    alert({
    type: 'error',
    text: 'Notice me, senpai!',
    delay: 3000
});
}