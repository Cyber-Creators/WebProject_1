import { API_KEY } from "../common/constants.js";
import { renderUploadedGifs } from "../views/history-view.js";
import { searchToHtml } from "../views/search-view.js";
import { renderFavoriteGifs } from "../views/favorites-view.js";
import { renderRandomGif } from "../views/random-view.js";

export const searchByString = async (searchString) => {
  try {
    const data = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchString}&limit=10`
    );
    const jsonData = await data.json();
    return searchToHtml(jsonData);
  } catch (e) {
    console.log(e.message);
  }
};

export const getGifsById = async (ids) => {
  try {
    const data = await fetch(
      `https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${ids}`
    );
    const jsonData = await data.json();
    return renderUploadedGifs(jsonData);
  } catch (e) {
    console.log(e.message);
  }
};

export const uploadGif = async (formdata) => {
  try {
    const data = await fetch(
      `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const jsonData = await data.json();
    const uploadedGifs = JSON.parse(localStorage.getItem("uploadedGifs"));
    uploadedGifs.push(jsonData.data.id);
    localStorage.setItem("uploadedGifs", JSON.stringify(uploadedGifs));
  } catch (e) {
    console.log(e.message);
  }
};

export const getRandomGif = async () => {
  try {
    const data = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`
    );
    const jsonData = await data.json();
    return renderRandomGif(jsonData);
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * Fetches data from the specified URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 */
export const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

/**
 * Fetches trending GIF data from the Giphy API.
 * @returns {Promise<Array<Object>>} An array of processed GIF data objects.
 * @throws {Error} If there is an error fetching the data.
 */
export const getTrendingData = async () => {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const processedData = data.data.map((el) => ({
      url: el.images.fixed_height.url,
      id: el.id,
    }));
    return processedData;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
};

/**
 * Retrieves details data for a given ID from the Giphy API.
 * @param {string} id - The ID of the GIF.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the processed data.
 * @throws {Error} - If there is an error fetching the data.
 */
export const getDetailsData = async (id) => {
  const url = `https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`;
  try {
    const data = await getData(url);
    const processedData = {
      url: data.data.images.original.url,
      title: data.data.title ? data.data.title : "No title added",
      username: data.data.username ? data.data.username : "No name added",
      rating: data.data.rating ? data.data.rating : "No rating added",
      embed_url: data.data.embed_url,
    };
    return processedData;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
};

export const getFavoriteGifsById = async (ids) => {
  try {
    const data = await fetch(
      `https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${ids}`
    );
    const jsonData = await data.json();
    return renderFavoriteGifs(jsonData);
  } catch (e) {
    console.log(e.message);
  }
};
