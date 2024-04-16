import { getTrendingData } from '../requests/request-service.js';

/**
 * Creates a trigger element for loading more trending GIFs and sets up an IntersectionObserver to load more GIFs when the trigger is intersected.
 * @param {HTMLElement} container - The container element where the GIFs are being displayed.
 * @return {HTMLElement} The container element with the trigger element appended.
 * @throws Will throw an error if there is a problem rendering the home page.
 */
export const renderHome = async () => {
  try {
    const data = await getTrendingData();
    const container = document.createElement('div');
    container.classList.add('trendingContainer');

    for (const el of data) {
      const img = document.createElement('img');
      img.src = el.url;
      img.id = el.id;
      img.classList.add('giphyImg');
      container.appendChild(img);
    }

    const triggerElement = document.createElement('div');
    triggerElement.id = 'load-more-trigger';
    container.appendChild(triggerElement);

    const observer = new IntersectionObserver(
      async (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMoreTrendingGIFs(container);
          }
        });
      },
      { threshold: 1 },
    );
    observer.observe(triggerElement);
    return container;
  } catch (error) {
    console.log(`Error rendering home: ${error}`);
    return '<h1>Error rendering home page</h1>';
  }
};

/**
 * Creates a title element for the trending section.
 * @return {Node} The first child of a div element containing the trending title HTML.
 */
export const trendingTitle = () => {
  const html = `
    <h3 class="trending">
      <i class="fa-solid fa-arrow-trend-up fa-xl"></i>Trending
    </h3>
  `;
  const div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstChild;
};

/**
 * Loads more trending GIFs into the container.
 * @param {HTMLElement} container - The container element where the GIFs are being displayed.
 * @throws Will throw an error if there is a problem loading the trending data.
 */
const loadMoreTrendingGIFs = async (container) => {
  try {
    const currentCount = container.querySelectorAll('.giphyImg').length;
    const newData = await getTrendingData(currentCount);

    for (const el of newData) {
      const img = document.createElement('img');
      img.src = el.url;
      img.id = el.id;
      img.classList.add('giphyImg');
      container.appendChild(img);
    }
  } catch (error) {
    console.error('Error loading more trending GIFs:', error);
  }
};
