import { API_KEY } from "../common/constants.js";

export const searchByString = async (searchString) => {

    try {
        const data = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchString}&limit=5`);
        const jsonData = await data.json();

        

    } catch (e) {
        console.log(e.message);
    }

};