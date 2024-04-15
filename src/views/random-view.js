export const renderRandomGif = (jsonData) => 
    `<div id="favoritesList">
        <div id="gifContainer">
            <img src="${jsonData.data.images.fixed_height.webp}" id="${jsonData.data.id}" class="giphyImg">
        </div>
    </div>
    <div class="divDetails"> </div>`
;