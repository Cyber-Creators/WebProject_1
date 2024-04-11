import { renderHome, trendingTitle } from "./views/trending-view.js";
import { q } from "./events/helpers.js";
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#container");
  container.appendChild(trendingTitle());
  const renderedContent = await renderHome();
  container.appendChild(renderedContent);

  // add global listener
  document.addEventListener("click", (event) => {});

  // search events
  q("input#search").addEventListener("input", (event) => {
    renderSearchItems(event.target.value);
  });

  // loadPage(HOME);
});
