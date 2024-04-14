export const renderUploadedGifs = (jsonData) => 
`<div id="history">
    ${jsonData.data
      .map((item) => {
        return `<div id="gifContainer">
                  <img src="${item.images.fixed_height.url}" id="${item.id}" class="giphyImg"><br>
                  <button id="deleteUploadedGif">Delete Gif</button>
              </div>`;
      })
      .join("\n")}
</div>
<div class="divDetails"> </div>`;