export const searchToHtml = (jsonData) => `
<div id="allGifsContainer">
    ${jsonData.data.map(item => {
      return `<div id="gifContainer">
                  <img src="${item.images.fixed_height.webp}">
              </div>`;
      })
      .join('\n')
    }
</div>`;
