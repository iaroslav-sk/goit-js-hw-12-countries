const BASE_URL = 'https://restcountries.eu/rest/v2/';

export default class CountryApiSearchService {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    const url = `${BASE_URL}name/${this.searchQuery}`;
    return fetch(url).then(response => response.json());
  }

  get query() {
    return this.searchQuery.trim();
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
