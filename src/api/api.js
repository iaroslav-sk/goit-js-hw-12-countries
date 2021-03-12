const BASE_URL = 'https://restcountries.eu/rest/v2/';

export default class ImageApiSearchService {
  constructor() {
    this.searchQuery = '';
  }

  fetchImages() {
    const url = `${BASE_URL}name/${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(hits => {
        // if (hits.length > 10) {
        //   console.log('Введите более корректный запрос!');
        // }

        return hits;
      });
  }

  get query() {
    return this.searchQuery.trim();
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
