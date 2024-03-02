// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import fetchServer from './js/pixabay-api';

import svgError from '/img/bi_x-octagon.svg';

import renderFunctions from './js/render-functions';

let searchText;
let pageNumber;
let maxPage;
const perPage = 15;
const formSubmit = document.querySelector('.form');
formSubmit.addEventListener('submit', onSubmit);
const LoadButton = document.querySelector('.load-button');
LoadButton.addEventListener('click', onLoadButton);

async function onSubmit(event) {
  searchText = event.target.elements.searchInput.value.trim();
  renderFunctions.hideLoadButton();
  event.preventDefault();
  renderFunctions.removeMarkup();
  event.target.reset();

  if (searchText) {
    renderFunctions.setLoader();
    pageNumber = 1;

    try {
      const data = await fetchServer(searchText, pageNumber, perPage);

      if (data.hits.length === 0) {
        renderFunctions.removeLoader();
        iziToast.error({
          timeout: 3000,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          maxWidth: '432px',
          messageColor: '#fff',
          messageSize: '16px',
          messageLineHeight: '1.5',
          backgroundColor: '#ef4040',
          position: 'topRight',
          titleColor: '#fff',
          titleSize: '16px',
          titleLineHeight: '1.5',
          iconUrl: svgError,
        });
        return;
      } else {
        maxPage = Math.ceil(data.totalHits / perPage);
        renderFunctions.renderMarkup(data.hits);
      }
    } catch {
      console.log('Mistake from server');
    }

    renderFunctions.removeLoader();
    renderFunctions.loadButtonStatus(pageNumber, maxPage);
  }
}

async function onLoadButton() {
  renderFunctions.setLoader();
  pageNumber += 1;

  const data = await fetchServer(searchText, pageNumber, perPage);

  renderFunctions.renderMarkup(data.hits);
  renderFunctions.removeLoader();
  renderFunctions.loadButtonStatus(pageNumber, maxPage);
  if (pageNumber >= maxPage) {
    iziToast.info({
      timeout: 3000,
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }
  window.scrollBy({
    behavior: 'smooth',
    top:
      2 *
      document.querySelector('.gallery-item').getBoundingClientRect().height,
  });
}
