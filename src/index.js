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

      const searchString = document.querySelector("input#search").value;

      const api_key = 'OjO2azlZWV1Y4SABaT4Nuw1bsaHIJKON';

      const search_api = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchString}&limit=5`;

      console.log(search_api);

      const data = await fetch(search_api);

      console.log(data.json());


      } catch (error) {
        console.log(error.message);
      }





    }

  });

});
