import searchList from './templates/search-list.hbs';
import imageItemsCard from './templates/countries-items.hbs';
import CountryApiSearchService from './api/api';
import './styles.css';
import _ from 'lodash';

// --------------------------------------//
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});
// -------------------------------------//

const refs = {
  searchForm: document.querySelector('.input'),
  gallery: document.querySelector('.gallery'),
  countryList: document.querySelector('.country-list-js'),
};

refs.searchForm.addEventListener('input', _.debounce(onSearch, 500));

const countryApiSearchService = new CountryApiSearchService();

function onSearch(e) {
  e.preventDefault();
  countryApiSearchService.query = e.target.value;
  if (countryApiSearchService.query.length === 0) {
    clearCountyFormItem();
    return;
  }
  clearCountryListItem();
  clearCountyFormItem();
  fetchCountries();
}

function fetchCountries() {
  countryApiSearchService.fetchCountries().then(response => {
    if (response.length === 1) {
      appendCountriesCardItems(response);
      return;
    } else if (response.length <= 10) {
      appendCountryListItems(response);
    } else if (response.length > 10) {
      error({
        text: 'Too many matches found. Please enter a more specific query!',
      });
    }
  });
}

function appendCountriesCardItems(response) {
  refs.gallery.insertAdjacentHTML('beforeend', imageItemsCard(response));
}
function appendCountryListItems(response) {
  refs.countryList.insertAdjacentHTML('beforeend', searchList(response));
}

function clearCountyFormItem() {
  refs.gallery.innerHTML = '';
}
function clearCountryListItem() {
  refs.countryList.innerHTML = '';
}
