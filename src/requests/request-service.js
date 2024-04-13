import { API_KEY, API_KEY2 } from "../common/constants.js";
import { searchToHtml } from "../views/search-view.js";

export const searchByString = async (searchString) => {
  try {
    const data = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchString}&limit=5`
    );
    const jsonData = await data.json();
    return searchToHtml(jsonData);
  } catch (e) {
    console.log(e.message);
  }
};

// Get data by url
export async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

// Trending data
export async function getTrendingData() {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY2}&limit=20`;

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
}

// Details data
export async function getDetailsData(id) {
  const url = `https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY2}`;
  try {
    const data = await getData(url);
    const processedData = {
      url: data.data.images.original.url,
      title: data.data.title,
      username: data.data.username ? data.data.username : "No name",
      rating: data.data.rating,
      embed_url: data.data.embed_url,
    };
    return processedData;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
}
