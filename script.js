const movies = [
  {
    title: "Young Swordsman EP12",
    category: "Action",
    genre: "Action • Episode 12",
    description: "Young Swordsman Episode 12.",
    poster: "Screenshot_20260916-075509.png",
    video: "https://pub-945fd499c47346f1923953fd79ef28c5.r2.dev/YOUNG%20SWORDSMAN%20EP12.mp4"
  }
];

const grid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

function renderMovies(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    noResults.hidden = false;
    return;
  }

  noResults.hidden = true;

  list.forEach(movie => {
    const card = document.createElement("article");
    card.className = "movie-card";

    card.innerHTML = `
      <img 
        class="movie-poster"
        src="${movie.poster}"
        alt="${movie.title}"
      >

      <div class="movie-info">
        <h3>${movie.title}</h3>

        <p class="movie-meta">
          ${movie.genre}
        </p>

        <a
          href="${movie.video}"
          target="_blank"
          class="watch-button"
        >
          ▶ WATCH / PLAY
        </a>

        <a
          href="${movie.video}"
          download
          class="download-button"
        >
          ⬇ DOWNLOAD
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
}

function filterMovies() {
  const search = searchInput.value.toLowerCase().trim();

  const filtered = movies.filter(movie =>
    movie.title.toLowerCase().includes(search) ||
    movie.genre.toLowerCase().includes(search)
  );

  renderMovies(filtered);
}

searchInput.addEventListener("input", filterMovies);

renderMovies(movies);
