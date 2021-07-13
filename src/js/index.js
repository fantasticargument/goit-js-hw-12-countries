import countryCard from '../templates/country-card';
import countryList from '../templates/country-list';
import API from '../js/fetchCountries' ;
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
defaultModules.set(PNotifyMobile, {});
const eve = new Event('input')

const rfs = {
    searchCountry: document.querySelector('.js-input-country'),
    countryCard: document.querySelector('.js-card-county'),
}

var debounce = require('lodash.debounce');

rfs.searchCountry.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
    const request = event.target.value;

    API.fetchCountry(request)
        .then(renderCountryCard)
        .catch(onFetchError)
        // .finally(onFinallyClear)
}

function renderCountryCard(country) {
    console.log(country);
    if (country.length > 10) {
        rfs.countryCard.innerHTML = '';
        alert({
        text: 'Enter a more specific country name',
        delay: 3000}
        );
    } else if (country.length > 1 && country.length < 10 ) {
        rfs.countryCard.innerHTML = countryList(country);
        rfs.countryCard.addEventListener('click', choosCountry)
    } else {
        rfs.countryCard.innerHTML = countryCard(...country);
    }
}

function onFetchError() {
    rfs.countryCard.innerHTML = '';
    alert({
    type: 'error',
    text: 'We could not find a country that matched your query. Please try to enter the correct name',
    delay: 3000}
);
}

function choosCountry(choosCountryName) {
    rfs.searchCountry.value = '';
    rfs.searchCountry.value = choosCountryName.target.textContent.trim();
    rfs.searchCountry.dispatchEvent(eve)
}
// function onFinallyClear() {
//     rfs.searchCountry.value= ''
// }