const searchForm = document.querySelector("#searchForm");
const container = document.querySelector(".container");

// helper functions
const resetInput = function() {
  searchForm.elements.query.value = '';
};

const createShow = function(resultsArray) {
  for (let show of resultsArray) {
    if (show.show.image) {
      const img = document.createElement("img");
      img.src = show.show.image.medium;
      const newShow = document.createElement("article");
      const span = document.createElement("span");
      if (show.show.rating.average) {
        span.innerText = `${show.show.name} - rated ${show.show.rating.average}`;
      } else {
        span.innerText = `${show.show.name}`;
      }
      
      newShow.append(img);
      newShow.append(span);
      container.append(newShow); 
    }
  }
};


const clearResults = function() {
  container.innerHTML = "";
};

// event listener
searchForm.addEventListener("submit", function(e) {
  e.preventDefault();

  clearResults();
  const query = this.elements.query.value;
  axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then((results) => {
      createShow(results.data);
      resetInput();
    })
    .catch((e) => {
      console.log(e);
    })
})