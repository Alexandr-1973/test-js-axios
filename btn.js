document.querySelector('.shopping-list').addEventListener('click', event => {
  event.preventDefault();
  if (event.target.nodeName == 'BUTTON') {
    const bookId = event.target.closest('li').getAttribute('id');
    console.log(bookId);
    const newArray = queryLocalStorage().filter(obj => obj._id !== bookId);
    addtoLS(newArray);
    const deleteElementLi = document.querySelector(`li[id="${bookId}"]`);
    deleteElementLi.remove();
  }
  if (queryLocalStorage().length === 0) {
    addEmptyMarkup();
  }
});
