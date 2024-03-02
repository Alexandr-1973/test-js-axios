// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';



const renderFunctions = {
  
  renderMarkup(elements) {
    const markup = elements
      .map(image => {
        const {
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        } = image;
        return `<li class="gallery-item">
<a class="gallery-link" href=${largeImageURL}>
<img class="gallery-image" src=${webformatURL} alt="${tags}" />
</a><div class="options-div"><div class="item-div"><h4 class="item-div-name">Likes</h4>
  <p class="item-div-text">${likes}</p></div><div class="item-div"><h4 class="item-div-name">Views</h4>
  <p class="item-div-text">${views}</p></div><div class="item-div"><h4 class="item-div-name">Comments</h4>
  <p class="item-div-text">${comments}</p></div><div class="item-div"><h4 class="item-div-name">Downloads</h4>
  <p class="item-div-text">${downloads}</p></div></div>
</li>`;
      })
      .join('');

    document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);

    var lightbox = new SimpleLightbox('.gallery a', {
      captionPosition: 'bottom',
      captionsData: 'alt',
      className: 'modal',
      /* options */
    });
    lightbox.refresh();
  },

  removeMarkup() {
    document.querySelector('.gallery').innerHTML = '';
  },

  setLoader() {
    document
      .querySelector('.load-button')
      .insertAdjacentHTML('afterend', `<span class="loader"></span>`);
  },

  removeLoader() {
    document.querySelector('.loader').remove();
  },

  loadButtonStatus(pageNumber, maxPage) {
    if (pageNumber < maxPage) {
      document.querySelector('.load-button').classList.remove('hidden');
    } else {
      document.querySelector('.load-button').classList.add('hidden');
    }
  },

  hideLoadButton() {
    document.querySelector('.load-button').classList.add('hidden');
  },
};

export default renderFunctions;
