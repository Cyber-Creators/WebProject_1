import { searchByString } from "./requests/request-service.js";
import { renderHome, trendingTitle } from "./views/trending-view.js";
import { renderDetails, Details } from "./views/display-details.js";

document.addEventListener("DOMContentLoaded", async () => {
  const detailsView = Details();
  const renderedContent = await renderHome();
  const container = document.querySelector("#container");
  container.appendChild(trendingTitle());
  container.appendChild(renderedContent);
  container.appendChild(detailsView);
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("giphyImg")) {
      const detailsDiv = document.querySelector(".divDetails");
      await renderDetails(e.target.id, detailsDiv);
      detailsDiv.style.display = "block";
    } else {
      const detailsDiv = document.querySelector(".divDetails");
      detailsDiv.style.display = "none";
    }
  });

  // add global listener for "click" events -> filter clicks by element id
  document.addEventListener("click", async (event) => {
    if (event.target.id === "searchBtn") {
      const searchString = document.querySelector("input#search").value;
      document.querySelector("div#container").innerHTML = await searchByString(
        searchString
      );
    }
  });
});
