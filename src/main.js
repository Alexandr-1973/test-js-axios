// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import fetchServer from './js/pixabay-api';

import svgError from '/img/bi_x-octagon.svg';

import renderFunctions from './js/render-functions';

import axios from 'axios';

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

let idArray = [];
let firstArray = [];
const res = await axios.get(
  'https://books-backend.p.goit.global/books/top-books'
);
firstArray = res.data;
// console.log(firstArray);

for (let y = 0; y <= 5; y += 1) {
  for (let i = 0; i <= 4; i += 1) {
    idArray.push(firstArray[y].books[i]._id);
  }
}
// console.log(idArray);

let inLocalStorage = [];

let f;
async function setLS() {
  for (let i = 0; i < idArray.length; i += 1) {
    // console.log(idArray[i]);
    const result = await axios.get(
      `https://books-backend.p.goit.global/books/${idArray[i]}`
    );
    inLocalStorage.push(result.data);
  }
  localStorage.setItem("addBook", JSON.stringify(inLocalStorage));
}

setLS();
// console.log(booksArray);

// '643282b1e85766588626a085';
// const t = '643282b1e85766588626a0ba';
// const result = await axios.get(
//   `https://books-backend.p.goit.global/books/${t}`
// );
// console.log(result.data);
// console.log(inStorage);
// console.log(JSON.stringify(inStorage));

// const LOCAL_STORAGE_KEY = 'addBook';
// localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inStorage[0]));

// 643282b1e85766588626a0ba

// const shopObject = {
//  const book_image:
//     'https://storage.googleapis.com/du-prd/books/images/9780385547345.jpg',
//   title: 'LESSONS IN CHEMISTRY',
//   list_name: 'Audio Fiction',
//   description:
//     'A scientist and single mother living in California in the 1960s becomes a star on a TV cooking show.',
//   author: 'Bonnie Garmus',
//   amazonUrl: 'https://www.amazon.com/dp/038554734X?tag=NYTBSREV-20',
//   appleBooksUrl: 'https://goto.applebooks.apple/9780593507537?at=10lIEQ',
//   id: '643282b1e85766588626a085',
// };
