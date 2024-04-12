import { API_KEY, API_KEY2 } from "../common/constants.js";
import { getData } from "../requests/request-service.js";
import { EMPTY_HEART, FULL_HEART } from "../common/constants.js";

export function Details() {
  const divDetail = document.createElement("div");
  divDetail.className = "divDetails";
  return divDetail;
}

export async function renderDetails(id, div) {
  const url = `https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY2}`;
  const data = await getData(url);
  div.innerHTML = `
  <img src="${data.data.images.original.url} alt="" />
  <h3>${data.data.title}</h3>
  <hr id="hr" />
  <p>Username: <span id="name">${
    data.data.username ? data.data.username : "No name"
  }</span></p>
  <p>rating: ${data.data.rating}</p>
  <a href=${
    data.data.embed_url
  } target="_blank"><i class="fa-solid fa-up-right-from-square fa-lg" style="color: #63E6BE;"></i>  Giffy</a><br />
  <span class="favorite" >${EMPTY_HEART}</span>
  `;
}
