/**
 * Converts the search results returned by giphy.com API into HTML representation
 * @param {Object} jsonData The data returned by giphy.com in JSON format
 * @returns {string} The HTML representation of the received JSON data
 */
export const searchToHtml = (jsonData) => `
<div id="allGifsContainer">
    ${jsonData.data
      .map((item) => {
        return `<div id="gifContainer">
                  <img src="${item.images.fixed_height.webp}" id="${item.id}" class="giphyImg">
              </div>`;
      })
      .join("\n")}
</div>
<div class="divDetails"> </div>
`;
