import { getTrendingData } from "../requests/request-service.js";

export async function renderHome() {
  try {
    const data = await getTrendingData();
    const container = document.createElement("div");
    container.classList.add("trendingContainer");
    
    for (let el of data) {
      const img = document.createElement("img");
      img.src = el.url;
      img.id = el.id;
      img.classList.add("giphyImg");
      container.appendChild(img);
    }

    const triggerElement = document.createElement("div");
    triggerElement.id = "load-more-trigger";
    container.appendChild(triggerElement);

    const observer = new IntersectionObserver(
      async (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMoreTrendingGIFs(container);
          }
        });
      },
      { threshold: 1 }
    );
    observer.observe(triggerElement);
    return container;
  } catch (error) {
    console.log(`Error rendering home: ${error}`);
    return "<h1>Error rendering home page</h1>";
  }
}

export function trendingTitle() {
  const html = `
    <h3 class="trending">
      <i class="fa-solid fa-arrow-trend-up fa-xl"></i>Trending
    </h3>
  `;
  const div = document.createElement("div");
  div.innerHTML = html.trim();
  return div.firstChild;
}

async function loadMoreTrendingGIFs(container) {
  try {
    const currentCount = container.querySelectorAll('.giphyImg').length;
    const newData = await getTrendingData(currentCount);

    for (let el of newData) {
      const img = document.createElement("img");
      img.src = el.url;
      img.id = el.id;
      img.classList.add("giphyImg");
      container.appendChild(img);
    }
  } catch (error) {
    console.error("Error loading more trending GIFs:", error);
  }
}
