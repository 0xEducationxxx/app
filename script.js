const API = "https://www.omdbapi.com/?apikey=7f5e8f7a";

const input = document.getElementById("searchInput");
const container = document.getElementById("movieContainer");

const modal = document.getElementById("modal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalYear = document.getElementById("modalYear");
const modalPlot = document.getElementById("modalPlot");
const closeModal = document.getElementById("closeModal");

// SEARCH EVENT
input.addEventListener("keyup", () => {
  const q = input.value.trim();
  if (q.length > 2) fetchMovies(q);
});

async function fetchMovies(query) {
  const res = await fetch(`${API}&s=${query}`);
  const data = await res.json();

  container.innerHTML = "";

  if (!data.Search) {
    container.innerHTML = "<p style='color:#777;'>No movies found...</p>";
    return;
  }

  data.Search.forEach(m => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${m.Poster !== 'N/A' ? m.Poster : 'https://via.placeholder.com/300x400'}">
      <div class="card-title">${m.Title}</div>
      <div class="year">${m.Year}</div>
    `;

    card.addEventListener("click", () => openModal(m.imdbID));
    container.appendChild(card);
  });
}

// OPEN MODAL
async function openModal(id) {
  const res = await fetch(`${API}&i=${id}`);
  const movie = await res.json();

  modalPoster.src = movie.Poster;
  modalTitle.textContent = movie.Title;
  modalYear.textContent = "Year: " + movie.Year;
  modalPlot.textContent = movie.Plot;

  modal.classList.remove("hidden");
}

// CLOSE MODAL
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.onclick = (e) => {
  if (e.target === modal) modal.classList.add("hidden");
};
