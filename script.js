const movies = [
  {
    title: "Young Swordsman EP12",
    category: "Action",
    genre: "Action • Episode 12",
    description: "Young Swordsman Episode 12.",
    poster: "Screenshot_20260916-075509.png",
video: "https://pub-945fd499c47346f1923953fd79ef28c5.r2.dev/YOUNG%20SWORDSMAN%20EP12.mp4"
  },

  {
    

  {
    
];

const grid = document.querySelector("#movieGrid");
const noResults = document.querySelector("#noResults");
const searchInput = document.querySelector("#searchInput");

let selectedCategory = "ALL";


function renderMovies(list) {
  grid.innerHTML = "";

  list.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img
        class="movie-poster"
        src="${movie.poster}"
        alt="${movie.title} poster"
        loading="lazy"
      >

      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p class="movie-meta">${movie.genre}</p>
        <button class="card-btn">View Details</button>
      </div>
    `;

    card
      .querySelector(".card-btn")
      .addEventListener("click", () => {
        openMovie(movie);
      });

    grid.appendChild(card);
  });

  noResults.hidden = list.length !== 0;
}


function filterMovies() {
  const term = searchInput.value.toLowerCase().trim();

  const filtered = movies.filter((movie) => {
    const categoryOK =
      selectedCategory === "ALL" ||
      movie.category.toUpperCase() === selectedCategory;

    const searchOK = `
      ${movie.title}
      ${movie.genre}
      ${movie.description}
    `
      .toLowerCase()
      .includes(term);

    return categoryOK && searchOK;
  });

  renderMovies(filtered);
}


function openMovie(movie) {
  if (movie.video) {
    window.location.href = movie.video;
    return;
  }

  if (movie.trailer) {
    window.open(movie.trailer, "_blank");
    return;
  }

  alert(`No video or trailer is available for ${movie.title}.`);
}


// Search
if (searchInput) {
  searchInput.addEventListener("input", filterMovies);
}


// Categories
document.querySelectorAll(".category-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".category-btn")
      .forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    selectedCategory = (
      button.dataset.category || "ALL"
    ).toUpperCase();

    filterMovies();
  });
});


// Display movies when the page loads
renderMovies(movies);
