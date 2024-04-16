/**
 * Generates a string of HTML that represents a container with favorite GIFs.
 * Each GIF is represented by an image element with the source set to the GIF's URL.
 *
 * @param {Object} jsonData - The JSON data from the Giphy API.
 * @return {string} A string of HTML that represents the favorite GIFs.
 */
export const renderFavoriteGifs = (jsonData) =>
  `<div id="favoritesContainer">
    ${jsonData.data
    .map((item) => {
      return `<div id="gifContainer">
                  <img src="${item.images.fixed_height.url}" id="${item.id}" class="giphyImg"><br>
              </div>`;
    })
    .join('\n')}
</div>
<div class="divDetails"> </div>`;
