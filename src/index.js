import { renderHome, trendingTitle } from "./views/trending-view.js";
import { q } from "./events/helpers.js";
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#container");
  container.appendChild(trendingTitle());
  const renderedContent = await renderHome();
  container.appendChild(renderedContent);

  // add global listener for "click" events -> filter clicks by element id
  document.addEventListener("click", (event) => {

    if (event.target.id === "searchBtn") {

      const searchString = document.getElementById("search").value;

      console.log(searchString);




    }

  });

});
