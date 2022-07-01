const searchForm = document.querySelector("#searchForm");
const container = document.querySelector("ul.container");

const resetInput = function() {
  searchForm.elements.query.value = '';
};
const createImage = function(results) {
  for (let show of results.data) {
    if (show.show.image.medium) {
      const img = document.createElement("img");
      img.src = show.show.image.medium;
      const newShow = document.createElement("li");
      newShow.append(img);
      container.append(newShow); 
    }
  }
};

searchForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const query = this.elements.query.value;
  axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then((results) => {
      createImage(results);
      resetInput();
    })
    .catch((e) => {
      console.log(e);
    })
})