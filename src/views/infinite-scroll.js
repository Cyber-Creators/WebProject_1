import { getTrendingData } from '../requests/request-service.js';
import { renderHome } from './trending-view.js';

let offset = 0;

const loadMoreTrendingGIFs = async () => {
  try {
    offset += 20;

    const newData = await getTrendingData(offset);

    renderHome(newData);
  } catch (error) {
    console.error('Error loading more trending GIFs:', error);
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadMoreTrendingGIFs();
      }
    });
  },
  { threshold: 1 },
);

const target = document.getElementById('load-more-trigger');
observer.observe(target);
