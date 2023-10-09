import {imagesService} from './images-service.js'

export const form = document.getElementById('search-form');
export const loadMore = document.querySelector('.load-more');
export const gallery = document.querySelector('.gallery');
export let page = 1;

loadMore.style.display = 'none';

form.addEventListener('submit', getImages);
loadMore.addEventListener('click', onLoadMore);

function getImages(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  imagesService();
}

function onLoadMore(event) {
  event.preventDefault();
  page += 1;
  imagesService();
}