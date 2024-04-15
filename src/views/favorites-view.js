export const renderFavoriteGifs = (jsonData) =>
  `<div id="favoritesContainer">
    ${jsonData.data
      .map((item) => {
        return `<div id="gifContainer">
                  <img src="${item.images.fixed_height.url}" id="${item.id}" class="giphyImg"><br>
              </div>`;
      })
      .join("\n")}
</div>
<div class="divDetails"> </div>`;
