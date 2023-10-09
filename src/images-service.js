import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {form, loadMore, page, gallery} from './index.js'

const URL = 'https://pixabay.com/api/';
const API_KEY = '39834161-b44ad9889b268d198aeea1a60';
let lightbox = new SimpleLightbox(".gallery a");

const perPage = 40;

export async function imagesService() {
    try {
      const query = form.elements.searchQuery.value;
      const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      });
      const { data } = await axios.get(`${URL}?${params}`);
  
      if (data.total === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (page === 1) {
        Notiflix.Notify.success(
          `Hooray! We found ${data.total} images.`
        );
      }
  
      gallery.insertAdjacentHTML('beforeend', createMarkup(data));
    //   window.scrollTo(0, 0);
      lightbox.refresh();
  
      loadMore.style.display = 'block';
      const totalPages = Math.ceil(data.totalHits / perPage);
      if (totalPages === page) {
        loadMore.style.display = 'none';
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results"
        );
      }
      console.log(data);
      return data;
    } catch (err) {
      console.log('TRY-CATCH:', err);
      Notiflix.Notify.failure('Please try again');
    }
  }

  function createMarkup(obj) {
    return obj.hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<div class="photo-card">
          <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" height="280px" loading="lazy" /> </a>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${downloads}
              </p>
            </div>
          </div>
          `
      )
      .join('');
  }
  