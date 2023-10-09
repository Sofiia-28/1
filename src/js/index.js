import {imagesService, page} from './images-service'

const form = document.getElementById('search-form');
const loadMore = document.querySelector('.load-more');

loadMore.style.display = 'none';

form.addEventListener('submit', getImages);
loadMore.addEventListener('click', onLoadMore);

function getImages(event) {
  event.preventDefault();
  imagesService();
}

function onLoadMore(event) {
  event.preventDefault();
  page += 1;
  imagesService();
}