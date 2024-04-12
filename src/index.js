import { searchByString } from "./requests/request-service.js";
import { generateUploadForm } from "./views/upload-view.js";
import { renderHome, trendingTitle } from "./views/trending-view.js";
import { renderDetails, Details } from "./views/display-details.js";
import { qs, q } from "./events/helpers.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = q("#container");
  container.appendChild(trendingTitle());
  container.appendChild(await renderHome());
  container.appendChild(Details());

  document.addEventListener("click", async (e) => {
    const detailsDiv = q(".divDetails");
    if (e.target.classList.contains("giphyImg")) {
      await renderDetails(e.target.id, detailsDiv);
      detailsDiv.style.display = "block";
    } else {
      detailsDiv.style.display = "none";
    }
  });

  // add global listener for "click" events -> filter clicks by element id
  document.addEventListener("click", async (event) => {

    if (event.target.id === "searchBtn") {
      const searchString = document.querySelector("input#search").value;
      document.querySelector("div#container").innerHTML = await searchByString(searchString);
    }

    if (event.target.id === "uploadNav") {
      document.querySelector("div#container").innerHTML = await generateUploadForm();

      

    }

  });


});
