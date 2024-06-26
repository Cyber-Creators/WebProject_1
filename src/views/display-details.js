import { getDetailsData } from '../requests/request-service.js';
import { renderFavoriteStatus } from '../events/favorites-events.js';

/**
 * Creates and returns a div element for displaying details.
 * @return {HTMLElement} A div element with class name "divDetails".
 */
export const details = () => {
  const divDetail = document.createElement('div');
  divDetail.className = 'divDetails';
  return divDetail;
};

/**
 * Renders the details of a specific GIF.
 * @param {string} id - The ID of the GIF.
 * @param {HTMLElement} div - The div element where the details will be rendered.
 */
export const renderDetails = async (id, div) => {
  try {
    /**
     * @property {Object} data - The data from the API.
     */
    const data = await getDetailsData(id);
    div.innerHTML = `
      <img src="${data.url}" alt="" />
      <h3>${data.title}</h3>
      <hr id="hr" />
      <p>Username: <span id="name">${data.username}</span></p>
      <p>rating: <span id="rating"> ${data.rating}</span></p>
      <a href=${
  data.embed_url
} target="_blank"><i class="fa-solid fa-up-right-from-square fa-lg" style="color: rgb(95, 191, 255);"></i>  Giffy</a><br />
      ${renderFavoriteStatus(id)}
    `;
  } catch (error) {
    console.log(`Error rendering details: ${error}`);
    return '<h1>Error rendering details</h1>';
  }
};
