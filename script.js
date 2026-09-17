const movies = [
  {
    title: "YOUNG SWORDSMAN EP12",
    genre: "ACTION",
    year: "2026",
    poster: "13879.png",
    description: "Young Swordsman Episode 12.",
    video: "https://pub-945fd499c47346f1923953fd79ef28c5.r2.dev/YOUNG%20SWORDSMAN%20EP12.mp4"
  },
  {
    title: "YOUNG SWORDSMAN EP13",
    genre: "ACTION",
    year: "2026",
    poster: "13879.png",
    description: "Young Swordsman Episode 13.",
    video: "https://pub-945fd499c47346f1923953fd79ef28c5.r2.dev/YOUNG%20SWORDSMAN%20EP13.mp4"
  },
  {
    title: "YOUNG SWORDSMAN EP14",
    genre: "ACTION",
    year: "2026",
    poster: "13879.png",
    description: "Young Swordsman Episode 14.",
    video: "https://pub-945fd499c47346f1923953fd79ef28c5.r2.dev/YOUNG%20SWORDSMAN%20EP14.mp4"
  },
  {
    title: "YOUNG SWORDSMAN EP15",
    genre: "ACTION",
    year: "2026",
    poster: "13879.png",
    description: "Young Swordsman Episode 15.",
    video: "https://pub-945fd499c47346f1923953fd79ef28c5.r2.dev/YOUNG%20SWORDSMAN%20EP15.mp4"
  },
  {
    title: "YOUNG SWORDSMAN EP16",
    genre: "ACTION",
    year: "2026",
    poster: "13879.png",
    description: "Young Swordsman Episode 16.",
    video: "https://pub-945fd499c47346f1923953fd79ef28c5.r2.dev/YOUNG%20SWORDSMAN%20EP16.mp4"
  }
];

const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");

function renderMovies(list = movies) {
  if (!movieGrid) return;

  movieGrid.innerHTML = list.map((movie, index) => `
    <div class="movie-card">
      <img
        class="movie-poster"
        src="${movie.poster}"
        alt="${movie.title}"
      >

      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.genre} • ${movie.year}</p>

        <div class="movie-actions">
          <button
            class="card-btn watch-btn"
            data-index="${index}"
          >
            ▶ WATCH
          </button>

          <a
            class="card-btn download-btn"
            href="${movie.video}"
            download
          >
            ⬇ DOWNLOAD
          </a>
        </div>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".watch-btn").forEach(button => {
    button.addEventListener("click", () => {
      const movie = list[Number(button.dataset.index)];
      window.open(movie.video, "_blank");
    });
  });
}

/* SEARCH */
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(query) ||
      movie.genre.toLowerCase().includes(query)
    );

    renderMovies(results);
  });
}

/* CATEGORIES */
document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category.toUpperCase();

    if (category === "ALL") {
      renderMovies(movies);
    } else {
      renderMovies(
        movies.filter(movie =>
          movie.genre.toUpperCase() === category
        )
      );
    }
  });
});

/* SHOW ALL MOVIES */
renderMovies();
