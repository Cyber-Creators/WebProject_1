import { API_KEY } from "../common/constants.js";
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

export const getGifsById = async () => {


  


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
