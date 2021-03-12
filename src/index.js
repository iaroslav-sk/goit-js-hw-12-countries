import searchList from './templates/search-list.hbs';
import imageItemsCard from './templates/image-items.hbs';
import ImageApiSearchService from './api/api';
// --------------------------------------
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});
// ----------------------------------
import './styles.css';

const _ = require('lodash');

const refs = {
  searchForm: document.querySelector('.input'),
  gallery: document.querySelector('.gallery'),
  countryList: document.querySelector('.country-list-js'),
};

refs.searchForm.addEventListener('input', _.debounce(onSearch, 500));

const imageApiSearchService = new ImageApiSearchService();

function onSearch(e) {
  e.preventDefault();
  imageApiSearchService.query = e.target.value;
  if (imageApiSearchService.query.length === 0) {
    clearImagesFormItem();
    return;
  }
  clearCountryListItem();
  clearImagesFormItem();
  fetchImages();
}

function fetchImages() {
  imageApiSearchService.fetchImages().then(response => {
    if (response.length === 1) {
      appendImagesCardItems(response);
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

function appendImagesCardItems(response) {
  refs.gallery.insertAdjacentHTML('beforeend', imageItemsCard(response));
}
function appendCountryListItems(response) {
  refs.countryList.insertAdjacentHTML('beforeend', searchList(response));
}

function clearImagesFormItem() {
  refs.gallery.innerHTML = '';
}
function clearCountryListItem() {
  refs.countryList.innerHTML = '';
}
