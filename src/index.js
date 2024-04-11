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
      try {
        const api_key = "OjO2azlZWV1Y4SABaT4Nuw1bsaHIJKON";
        const searchString = document.querySelector("input#search").value;
        const data = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchString}&limit=5`
        );
        const jsonData = await data.json();

        const html = `
          <div id="allGifsContainer">
              ${jsonData.data
                .map((item) => {
                  return `<div id="gifContainer">
                            <img src="${item.images.fixed_height.webp}">
                        </div>`;
                })
                .join("\n")}
          </div>`;

        document.querySelector("div#container").innerHTML = html;
      } catch (e) {
        console.log(e.message);
      }
    }
  });
});
