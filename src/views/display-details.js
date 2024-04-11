import { getData } from "./trending-view.js";
const key = "OjO2azlZWV1Y4SABaT4Nuw1bsaHIJKON";
const key2 = "mvRJrWupzEx2WaJ8TDgcGOOXXcPXH3mF";

export function Details() {
  const divDetail = document.createElement("div");
  divDetail.className = "divDetails";
  return divDetail;
}

export async function renderDetails(id, div) {
  const url = `https://api.giphy.com/v1/gifs/${id}?api_key=${key2}`;
  const data = await getData(url);
  console.log(data);
  div.innerHTML = `
  <img src="${data.data.images.original.url} alt="" />
  <h3>${data.data.title}</h3>
  <hr id="hr" />
  <p>Username: <span id="name">${data.data.username}</span></p>
  <p>rating: ${data.data.rating}</p>
  <a href=${data.data.embed_url} target="_blank"><i class="fa-solid fa-up-right-from-square fa-lg" style="color: #63E6BE;"></i>  Giffy</a>
  `;
}
