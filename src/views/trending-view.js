import { getTrendingData } from "../requests/request-service.js";

/**
 * Renders the trending GIFs.
 * @property {Object} data - The data from the API.
 * @property {string} url - The URL of the GIF.
 * @property {string} id - The ID of the GIF.
 */
export async function renderHome() {
  try {
    const data = await getTrendingData();
    let html = `<div class="trendingContainer">`;
    for (let el of data) {
      html += `
        <img src="${el.url}" id="${el.id}" class="giphyImg">
      `;
    }
    html += `</div>`;
    const div = document.createElement("div");
    div.innerHTML = html.trim();
    return div.firstChild;
  } catch (error) {
    console.log(`Error rendering home: ${error}`);
    return "<h1>Error rendering home page</h1>";
  }
}

/**
 * Creates and returns a div element containing the trending title.
 * @returns {HTMLElement} A div element containing the trending title.
 */
export function trendingTitle() {
  const html = `
    <h3 class="trending">
      <i class="fa-solid fa-arrow-trend-up fa-xl"></i>Trending
    </h3>
  `;
  const div = document.createElement("div");
  div.innerHTML = html.trim();
  return div.firstChild;
}
