let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

export const addFavorite = (favoriteId) => {
  if (favorites.find((id) => id === favoriteId)) {
    return;
  }

  favorites.push(favoriteId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const removeFavorite = (favoriteId) => {
  favorites = favorites.filter((id) => id !== favoriteId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const getFavorites = () => [...favorites];
