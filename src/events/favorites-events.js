import { EMPTY_HEART, FULL_HEART } from "../common/constants.js";
import { addFavorite, getFavorites, removeFavorite } from "./favorites.js";
import { q } from "./helpers.js";

export const toggleFavoriteStatus = (favoriteId) => {
  const favorites = getFavorites();
  const heartSpan = q(`span[data-movie-id="${favoriteId}"]`);

  if (favorites.includes(favoriteId)) {
    removeFavorite(favoriteId);
    heartSpan.classList.remove("active");
    heartSpan.innerHTML = EMPTY_HEART;
  } else {
    addFavorite(favoriteId);
    heartSpan.classList.add("active");
    heartSpan.innerHTML = FULL_HEART;
  }
};

export const renderFavoriteStatus = (favoriteId) => {
  const favorites = getFavorites();

  return favorites.includes(favoriteId)
    ? `<span class="favorite active" data-movie-id="${favoriteId}">${FULL_HEART}</span>`
    : `<span class="favorite" data-movie-id="${favoriteId}">${EMPTY_HEART}</span>`;
};
