import {
  getGifsById,
  searchByString,
  getFavoriteGifsById,
  uploadGif,
} from "./requests/request-service.js";
import { generateUploadForm } from "./views/upload-view.js";
import { renderHome, trendingTitle } from "./views/trending-view.js";
import { renderDetails, Details } from "./views/display-details.js";
import { qs, q } from "./events/helpers.js";
import { toggleFavoriteStatus } from "./events/favorites-events.js";

if (!localStorage.getItem("uploadedGifs")) {
  localStorage.setItem("uploadedGifs", JSON.stringify([]));
}

const addToDOM = async (uploadedGifs) => {
  document.querySelector("div#container").innerHTML =
        uploadedGifs.length !== 0
          ? await getGifsById(uploadedGifs.join(","))
          : "No Gif images uploaded.";
};

document.addEventListener("DOMContentLoaded", async () => {
  const container = q("#container");
  container.appendChild(trendingTitle());
  container.appendChild(await renderHome());
  container.appendChild(Details());

  // add global listener for "click" events -> filter clicks by element id
  document.addEventListener("click", async (event) => {
    console.log(event.target.className);
    /* renderDetails */
    const detailsDiv = q(".divDetails");
    if (detailsDiv) {
      if (event.target.classList.contains("giphyImg")) {
        await renderDetails(event.target.id, detailsDiv);
        detailsDiv.style.display = "block";
      } else if (
        event.target.className !== "giphyImg" &&
        event.target.className !== "divDetails" &&
        event.target.className !== "favorite" &&
        event.target.className !== "favorite active"
      ) {
        detailsDiv.style.display = "none";
      }
    }

    /* Search */
    if (event.target.id === "searchBtn") {
      const searchString = document.querySelector("input#search").value;
      document.querySelector("div#container").innerHTML = await searchByString(
        searchString
      );
    }

    /* Upload form */
    if (event.target.id === "uploadNav") {
      document.querySelector("div#container").innerHTML =
        await generateUploadForm();
    }

    /* History section (see uploaded gifs) */
    if (event.target.id === "uploadedGifs") {
      const uploadedGifs = JSON.parse(localStorage.getItem("uploadedGifs"));
      addToDOM(uploadedGifs);
    }

    /* Delete Gif button */
    if (event.target.id === "deleteUploadedGif") {
      const idToRemove = event.target.parentNode.querySelector("img").id;
      const uploadedGifs = JSON.parse(localStorage.getItem("uploadedGifs"));
      uploadedGifs.splice(uploadedGifs.indexOf(idToRemove), 1);
      localStorage.setItem("uploadedGifs", JSON.stringify(uploadedGifs));
      addToDOM(uploadedGifs);
    }

    /* Clicking on heart icons */
    if (event.target.classList.contains("favorite")) {
      const movieId = event.target.dataset.movieId;
      toggleFavoriteStatus(movieId);
    }

    /* Favorites page */
    if (event.target.id === "favorites") {
      event.preventDefault();
      const favorites = JSON.parse(localStorage.getItem("favorites"));
      console.log(favorites);
      document.querySelector("div#container").innerHTML =
        favorites.length !== 0
          ? await getFavoriteGifsById(favorites.join(","))
          : "No Gif images found in this section.";
    }
  });

  /* Upload form submission */
  document.addEventListener("submit", async (event) => {
    if (event.target.id === "myUploadForm") {
      event.preventDefault();
      const formdata = new FormData();
      formdata.append("file", document.querySelector("input#file").files[0]);
      uploadGif(formdata);
    }
  });
});
