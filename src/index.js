import {
  getGifsById,
  searchByString,
  getFavoriteGifsById,
} from "./requests/request-service.js";
import { generateUploadForm } from "./views/upload-view.js";
import { renderHome, trendingTitle } from "./views/trending-view.js";
import { renderDetails, Details } from "./views/display-details.js";
import { qs, q } from "./events/helpers.js";
import { toggleFavoriteStatus } from "./events/favorites-events.js";

if (!localStorage.getItem("uploadedGifs")) {
  localStorage.setItem("uploadedGifs", JSON.stringify([]));
}

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

      console.log(uploadedGifs);

      document.querySelector("div#container").innerHTML =
        uploadedGifs.length !== 0
          ? await getGifsById(uploadedGifs.join(","))
          : "No Gif images uploaded.";
    }

    if (event.target.id === "deleteUploadedGif") {
      const idToRemove = event.target.parentNode.querySelector("img").id;

      console.log(idToRemove);

      const uploadedGifs = JSON.parse(localStorage.getItem("uploadedGifs"));

      console.log(uploadedGifs);

      const index = uploadedGifs.indexOf(idToRemove);

      uploadedGifs.splice(index, 1);

      console.log(uploadedGifs);

      localStorage.setItem("uploadedGifs", JSON.stringify(uploadedGifs));

      document.querySelector("div#container").innerHTML =
        uploadedGifs.length !== 0
          ? await getGifsById(uploadedGifs.join(","))
          : "No Gif images uploaded.";
    }
    /* favorites */
    if (event.target.classList.contains("favorite")) {
      const movieId = event.target.dataset.movieId;
      toggleFavoriteStatus(movieId);
    }

    if (event.target.id === "favorites") {
      event.preventDefault();
      const favorites = JSON.parse(localStorage.getItem("favorites"));
      console.log(favorites);
      document.querySelector("div#container").innerHTML =
        favorites.length !== 0
          ? await getFavoriteGifsById(favorites.join(","))
          : "No Gif images uploaded.";
    }
  });

  document.addEventListener("submit", async (event) => {
    if (event.target.id === "myUploadForm") {
      event.preventDefault();
      const fileInput = document.querySelector("input#file");
      const formdata = new FormData();
      formdata.append("file", fileInput.files[0]);

      const data = await fetch(
        `https://upload.giphy.com/v1/gifs?api_key=KtzPyAoJb9AgzuM037P7pcTReo7AnuBZ`,
        {
          method: "POST",
          body: formdata,
        }
      );

      // Get the response to the POST request and obtain the ID of the uploaded gif image (the response returns it)
      const jsonData = await data.json();

      const id = jsonData.data.id;

      const uploadedGifs = JSON.parse(localStorage.getItem("uploadedGifs")); // Converts the value to array (as it's string by default)

      uploadedGifs.push(id); // Adds the ID of the uploaded gif image to the array

      localStorage.setItem("uploadedGifs", JSON.stringify(uploadedGifs)); // Updates the localStorage with the stringified array
    }
  });
});
