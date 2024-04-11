import { renderHome, trendingTitle } from "./views/trending-view.js";
import { q } from "./events/helpers.js";
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#container");
  container.appendChild(trendingTitle());
  const renderedContent = await renderHome();
  container.appendChild(renderedContent);

  // add global listener for "click" events -> filter clicks by element id
  document.addEventListener("click", async (event) => {

    if (event.target.id === "searchBtn") {

      try {

          const api_key = 'OjO2azlZWV1Y4SABaT4Nuw1bsaHIJKON';
          const searchString = document.querySelector("input#search").value;

          const data = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchString}&limit=5`);
          const jsonData = await data.json();
      
          console.log(jsonData.data);

          jsonData.data.map(item => {

            const imageContainer = document.createElement('div');
            const gifImage = document.createElement('img');
            gifImage.src = item.images.fixed_height.webp;
            imageContainer.appendChild(gifImage);
            document.querySelector("div#container").appendChild(imageContainer);

          });

      } catch (error) {
        console.log(error.message);
      }

    }

  });

});
