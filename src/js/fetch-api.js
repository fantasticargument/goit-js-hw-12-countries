import countryCard from '../templates/country-card'
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
defaultModules.set(PNotifyMobile, {});

const rfs = {
    searchCountry: document.querySelector('.js-input-country'),
    countryCard: document.querySelector('.js-card-county'),
}

var debounce = require('lodash.debounce');

rfs.searchCountry.addEventListener('input', debounce(onInputChange, 3000));

function onInputChange(event) {

    const request = event.target.value;

    fetchCountry(request)
        .then(renderCountryCard)
        .catch(onFetchError)
}

function fetchCountry(countryName){
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(response => {
        return response.json();
    })
} 

function renderCountryCard(country) {
    rfs.countryCard.innerHTML = countryCard(...country);
}

function onFetchError() {
    alert({
    type: 'error',
    text: 'We could not find a country that matched your query. Please try to enter the correct name',
    delay: 3000}
);
}