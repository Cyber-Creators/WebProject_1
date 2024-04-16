import { card } from "../events/cards.js";

/**
 * Generates a string of HTML that represents the about view.
 * The about view contains three cards, each with a different image and name,
 * GitHub, Instagram, and Facebook links
 * @returns {string} A string of HTML that represents the about view.
 */
export const aboutView = () => {
  return `
  <div id="aboutContainer">
     ${card(
       "../../images/Ipetko8 (1).JPG",
       "Todor Savov",
       "https://github.com/Petkov-Petko",
       "https://www.instagram.com/petko_zlatilov/",
       "https://www.facebook.com/petko.zl/"
     )}
    ${card(
      "../../images/Ipetko8 (1).JPG",
      "Petko Petkov",
      "https://github.com/Petkov-Petko",
      "https://www.instagram.com/petko_zlatilov/",
      "https://www.facebook.com/petko.zl/"
    )}
    ${card(
      "../../images/AntonMiltenov.jpg",
      "Anton Miltenov",
      "https://github.com/AntonMiltenov",
      "https://www.instagram.com/anton.miltenov",
      "https://www.facebook.com/anton.miltenov.524"
    )}
  </div>
`;
};
