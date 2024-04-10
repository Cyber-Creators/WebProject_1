document.addEventListener('DOMContentLoaded', () => {





  // add global listener
  document.addEventListener('click', event => {

  

  });

  // search events
  q('input#search').addEventListener('input', event => {
    renderSearchItems(event.target.value);
  });

  loadPage(HOME);

});