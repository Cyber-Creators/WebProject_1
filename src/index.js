import { searchByString } from "./requests/request-service.js";
import { renderHome, trendingTitle } from "./views/trending-view.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#container");
  container.appendChild(trendingTitle());
  const renderedContent = await renderHome();
  container.appendChild(renderedContent);

  // add global listener for "click" events -> filter clicks by element id
  document.addEventListener("click", async (event) => {

    if (event.target.id === "searchBtn") {

          const searchString = document.querySelector("input#search").value;
          searchByString(searchString);
    
          const html = `
          <div id="allGifsContainer">
              ${jsonData.data.map(item => {
                return `<div id="gifContainer">
                            <img src="${item.images.fixed_height.webp}">
                        </div>`;
                })
                .join('\n')
              }
          </div>`;

          document.querySelector("div#container").innerHTML = html;

      

    }

  });


  

});
