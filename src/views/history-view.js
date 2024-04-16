/**
 * Renders the uploaded GIF images using data from browser localStorage and giphy.com API calls
 * @param {Object} jsonData The data returned by API call to giphy.com in JSON format
 * @return {string} HTML representation of the received data
 */
export const renderUploadedGifs = (jsonData) =>
  `<div id="history">
    ${jsonData.data
    .map((item) => {
      return `<div id="gifContainer">
                  <img src="${item.images.fixed_height.url}" id="${item.id}" class="giphyImg"><br>
                  <button id="deleteUploadedGif">Delete Gif</button>
              </div>`;
    })
    .join('\n')}
</div>
<div class="divDetails"> </div>`;
