import { API_KEY, API_KEY2 } from "../common/constants.js";
import { getData } from "../requests/request-service.js";
const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20`;

export async function renderHome() {
  try {
    const data = await getData(url);
    const div = document.createElement("div");
    div.classList = "trendingContainer";
    for (let el of data.data) {
      const gifImg = document.createElement("img");
      gifImg.src = el.images.fixed_height.url;
      gifImg.id = el.id;
      gifImg.className = "giphyImg";
      div.appendChild(gifImg);
    }
    return div;
  } catch (error) {
    console.log(`Error rendering home: ${error}`);
    return "<h1>Error rendering home page</h1>";
  }
}

export function trendingTitle() {
  const trendingTitle = document.createElement("h3");
  trendingTitle.innerHTML = `<i class="fa-solid fa-arrow-trend-up fa-xl"></i>Trending`;
  trendingTitle.className = "trending";
  return trendingTitle;
}
