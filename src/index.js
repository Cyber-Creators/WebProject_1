import {
  getGifsById,
  searchByString,
  getFavoriteGifsById,
  uploadGif,
  getRandomGif,
} from './requests/request-service.js';
import { generateUploadForm } from './views/upload-view.js';
import { renderHome, trendingTitle } from './views/trending-view.js';
import { renderDetails, details } from './views/display-details.js';
import { q } from './events/helpers.js';
import { toggleFavoriteStatus } from './events/favorites-events.js';
import { aboutView } from './views/about-view.js';
import './views/infinite-scroll.js';
import { setActiveNav } from './events/helpers.js';

if (!localStorage.getItem('uploadedGifs')) {
  localStorage.setItem('uploadedGifs', JSON.stringify([]));
}

const addToDOM = async (uploadedGifs) => {

  document.querySelector('div#container').innerHTML =
    uploadedGifs.length !== 0 ?
      await getGifsById(uploadedGifs.join(',')) :
      `<div id="historyText">No Gif images uploaded.</div>`;
};

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.querySelector('div#container');


  setActiveNav('home');
  const container = q('#container');
  root.appendChild(trendingTitle());
  root.appendChild(await renderHome());
  root.appendChild(details());

  document.addEventListener('click', async (event) => {
    const detailsDiv = q('.divDetails');
    if (detailsDiv) {
      if (event.target.classList.contains('giphyImg')) {
        await renderDetails(event.target.id, detailsDiv);
        detailsDiv.style.display = 'block';
      } else if (
        event.target.className !== 'giphyImg' &&
        event.target.className !== 'divDetails' &&
        event.target.className !== 'favorite' &&
        event.target.className !== 'favorite active'
      ) {
        detailsDiv.style.display = 'none';
      }
    }
    if (event.target.id === 'about') {
      event.preventDefault();
      root.innerHTML = aboutView();
    }

    /* Search */
    if (event.target.id === 'searchBtn') {
      const searchString = document.querySelector('input#search').value;
      root.innerHTML = await searchByString(
        searchString,
      );
    }

    /* Upload menu link */
    if (event.target.id === 'uploadNav') {
      root.innerHTML =
        await generateUploadForm();
    }

    /* History section (see uploaded gifs) */
    if (event.target.id === 'uploadedGifs') {
      const uploadedGifs = JSON.parse(localStorage.getItem('uploadedGifs'));
      addToDOM(uploadedGifs);
    }

    /* Delete Gif button */
    if (event.target.id === 'deleteUploadedGif') {
      const idToRemove = event.target.parentNode.querySelector('img').id;
      const uploadedGifs = JSON.parse(localStorage.getItem('uploadedGifs'));
      uploadedGifs.splice(uploadedGifs.indexOf(idToRemove), 1);
      localStorage.setItem('uploadedGifs', JSON.stringify(uploadedGifs));
      addToDOM(uploadedGifs);
    }

    /* Clicking on heart icons */
    if (event.target.classList.contains('favorite')) {
      const favoriteId = event.target.dataset.movieId;
      toggleFavoriteStatus(favoriteId);
    }

    /* Favorites page */
    if (event.target.id === 'favorites') {
      event.preventDefault();
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      if (favorites.length === 0) {
        r.innerHTML = `
        <div id="emptyFavorites">
          <div id="e">
           <p id="emptyTitle"> No favorite Gif images added yet.</p><br>
           ${await getRandomGif()}
            </div>
            </div>
        `;
      } else {
        r.innerHTML =
          await getFavoriteGifsById(favorites.join(','));
      }
    }

    if (event.target.id === 'confirm') {
      document.querySelector('div#complete').classList.add('hidden');
      r.innerHTML =
        await generateUploadForm();
    }

    /* Nav events */
    if (event.target.classList.contains('nav-link')) {
      setActiveNav(event.target.getAttribute('data-page'));
    }
  });

  /* Upload form submission */
  document.addEventListener('submit', async (event) => {
    if (event.target.id === 'myUploadForm') {
      event.preventDefault();
      const formdata = new FormData();
      formdata.append('file', document.querySelector('input#file').files[0]);
      document.querySelector('div#uploadForm').classList.add('hidden');
      document.querySelector('div#spinner').classList.remove('hidden');
      uploadGif(formdata);
    }
  });

  /* Listen for ENTER presses on search input field */
  document
    .querySelector('input#search')
    .addEventListener('keypress', async (event) => {
      if (event.key === 'Enter') {
        const searchString = document.querySelector('input#search').value;
        r.innerHTML =
          await searchByString(searchString);
      }
    });
});
