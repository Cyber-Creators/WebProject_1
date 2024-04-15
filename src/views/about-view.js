import { card } from "../events/cards.js";

export const aboutView = () => {
  return `
  <div id="aboutContainer">
     ${card(
       "./images/",
       "Todor Savov",
       "https://github.com/Petkov-Petko",
       "https://www.instagram.com/petko_zlatilov/",
       "https://www.facebook.com/petko.zl/"
     )}
    ${card(
      "./images/Ipetko8 (1).JPG",
      "Petko Petkov",
      "https://github.com/Petkov-Petko",
      "https://www.instagram.com/petko_zlatilov/",
      "https://www.facebook.com/petko.zl/"
    )}
    ${card(
      "./images/",
      "Anton Miltenov",
      "https://github.com/Petkov-Petko",
      "https://www.instagram.com/petko_zlatilov/",
      "https://www.facebook.com/petko.zl/"
    )}
  </div>
`;
};
