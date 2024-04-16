/**
 * Renders a random GIF image from giphy.com API when no favorites are added
 * @param {Object} jsonData The data returned by giphy.com in JSON format
 * @return {string} The HTML representation of the received data
 */
export const renderRandomGif = (jsonData) =>
  `<div id="favoritesList">
        <div id="gifContainer">
            <img src="${jsonData.data.images.fixed_height.webp}" id="${jsonData.data.id}" class="giphyImg">
        </div>
    </div>
    <div class="divDetails"> </div>`
;
