const key = "OjO2azlZWV1Y4SABaT4Nuw1bsaHIJKON";
const key2 = "mvRJrWupzEx2WaJ8TDgcGOOXXcPXH3mF";
const url = `https://api.giphy.com/v1/gifs/trending?api_key=${key2}&limit=20`;

export async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function renderHome() {
  try {
    const data = await getData(url);
    const div = document.createElement("div");
    div.classList = "trendingContainer";
    for (let el of data.data) {
      const gifImg = document.createElement("img");
      gifImg.src = el.images.fixed_height.url;
      gifImg.id = el.id;
      gifImg.className = "giphyImg";
      div.appendChild(gifImg);
    }
    return div;
  } catch (error) {
    console.log(`Error rendering home: ${error}`);
    return "<h1>Error rendering home page</h1>";
  }
}

export function trendingTitle() {
  const trendingTitle = document.createElement("h3");
  trendingTitle.innerHTML = `<i class="fa-solid fa-arrow-trend-up fa-xl"></i>Trending`;
  trendingTitle.className = "trending";
  return trendingTitle;
}
