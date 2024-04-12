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

  // add global listener for "click" events -> filter clicks by element id
  document.addEventListener("click", async (event) => {
    /* renderDetails */
    const detailsDiv = q(".divDetails");
    if (event.target.classList.contains("giphyImg")) {
      await renderDetails(event.target.id, detailsDiv);
      detailsDiv.style.display = "block";
    } else if (
      !(
        event.target.classList.contains("giphyImg") &&
        !(event.target.id === "uploadNav")
      )
    ) {
      detailsDiv.style.display = "none";
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
    }
  });
});
