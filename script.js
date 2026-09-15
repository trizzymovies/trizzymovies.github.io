
const movies = [
  {
    title: "Midnight Run",
    category: "Action",
    genre: "Action • 2026",
    description: "An action movie demo for Trizzy Movies.",
    poster: "https://placehold.co/600x900/161616/ffffff?text=Midnight+Run",
    trailer: "https://www.youtube.com/results?search_query=Midnight+Run+trailer"
  },
  {
    title: "The Last Mission",
    category: "Action",
    genre: "Action • 2026",
    description: "An exciting action mission.",
    poster: "https://placehold.co/600x900/1b1b1b/ffffff?text=The+Last+Mission",
    trailer: "https://www.youtube.com/results?search_query=The+Last+Mission+trailer"
  },
  {
    title: "Funny Days",
    category: "Comedy",
    genre: "Comedy • 2026",
    description: "A comedy movie demo.",
    poster: "https://placehold.co/600x900/222222/ffffff?text=Funny+Days",
    trailer: "https://www.youtube.com/results?search_query=comedy+movie+trailer"
  },
  {
    title: "After Dark",
    category: "Horror",
    genre: "Horror • 2025",
    description: "A horror movie demo.",
    poster: "https://placehold.co/600x900/151515/ffffff?text=After+Dark",
    trailer: "https://www.youtube.com/results?search_query=horror+movie+trailer"
  },
  {
    title: "City Lights",
    category: "Drama",
    genre: "Drama • 2025",
    description: "A drama movie demo.",
    poster: "https://placehold.co/600x900/202020/ffffff?text=City+Lights",
    trailer: "https://www.youtube.com/results?search_query=drama+movie+trailer"
  },
  {
    title: "Beyond Earth",
    category: "Sci-Fi",
    genre: "Sci-Fi • 2026",
    description: "A science-fiction movie demo.",
    poster: "https://placehold.co/600x900/181818/ffffff?text=Beyond+Earth",
    trailer: "https://www.youtube.com/results?search_query=sci-fi+movie+trailer"
  },
  {
    title: "Love Forever",
    category: "Romance",
    genre: "Romance • 2026",
    description: "A romance movie demo.",
    poster: "https://placehold.co/600x900/242424/ffffff?text=Love+Forever",
    trailer: "https://www.youtube.com/results?search_query=romance+movie+trailer"
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

let selectedCategory = "ALL";

function renderMovies(list) {
  grid.innerHTML = "";

  list.forEach(movie => {
    const card = document.createElement("article");
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

    card.querySelector(".card-btn").addEventListener("click", () => {
      openMovie(movie);
    });

    grid.appendChild(card);
  });

  noResults.hidden = list.length !== 0;
}

function filterMovies() {
  const term = searchInput.value.toLowerCase().trim();

  const filtered = movies.filter(movie => {
    const categoryOK =
      selectedCategory === "ALL" ||
      movie.category.toUpperCase() === selectedCategory;

    const searchOK =
      `${movie.title} ${movie.genre} ${movie.description}`
        .toLowerCase()
        .includes(term);

    return categoryOK && searchOK;
  });

  renderMovies(filtered);
}

document.querySelectorAll(".category-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    selectedCategory = button.dataset.category.toUpperCase();

    filterMovies();
  });
});

searchInput.addEventListener("input", filterMovies);

function openMovie(movie) {
  modalPoster.src = movie.poster;
  modalPoster.alt = `${movie.title} poster`;
  modalTitle.textContent = movie.title;
  modalGenre.textContent = movie.genre;
  modalDescription.textContent = movie.description;
  trailerBtn.href = movie.trailer;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeMovie() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", closeMovie);

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeMovie();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMovie();
  }
});

document.getElementById("year").textContent =
  new Date().getFullYear();

renderMovies(movies);
