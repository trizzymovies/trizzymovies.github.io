const movies = [
  {
    title: "Young Swordsman EP12",
    category: "Action",
    genre: "Action • Episode 12",
    description: "Young Swordsman Episode 12.",
    poster: "https://placehold.co/600x900/161616/ffffff?text=Young+Swordsman+EP12",
    video: "https://pub-945fd499c47346f1923953fd79ef28c5.r2.dev/YOUNG%20SWORDSMAN%20EP12.mp4"
  }
];

const grid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");
const modal = document.getElementById("movieModal");
const closeModal = document.getElementById("closeModal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalGenre = document.getElementById("modalGenre");
const modalDescription = document.getElementById("modalDescription");
const trailerBtn = document.getElementById("trailerBtn");
const categoryButtons = document.querySelectorAll(".category-btn");

let selectedCategory = "All";

function renderMovies(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    if (noResults) noResults.hidden = false;
    return;
  }

  if (noResults) noResults.hidden = true;

  list.forEach((movie) => {
    const card = document.createElement("article");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
      <div class="movie-info">
        <p class="movie-genre">${movie.genre}</p>
        <h3>${movie.title}</h3>
        <button class="watch-btn">▶ WATCH / PLAY</button>
      </div>
    `;

    card.querySelector(".watch-btn").addEventListener("click", () => {
      openMovie(movie);
    });

    grid.appendChild(card);
  });
}

function openMovie(movie) {
  modalPoster.src = movie.poster;
  modalTitle.textContent = movie.title;
  modalGenre.textContent = movie.genre;
  modalDescription.textContent = movie.description;

  trailerBtn.textContent = "▶ WATCH / PLAY";
  trailerBtn.href = movie.video;
  trailerBtn.target = "_blank";

  modal.hidden = false;
}

function filterMovies() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filtered = movies.filter((movie) => {
    const matchesCategory =
      selectedCategory === "All" ||
      movie.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.genre.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  renderMovies(filtered);
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    selectedCategory = button.dataset.category;
    filterMovies();
  });
});

searchInput.addEventListener("input", filterMovies);

closeModal.addEventListener("click", () => {
  modal.hidden = true;
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.hidden = true;
  }
});

renderMovies(movies);
