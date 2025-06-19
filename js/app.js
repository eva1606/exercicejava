const cardsContainer = document.getElementById('cardsContainer');
const errorContainer = document.getElementById('errorContainer');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

let allItems = []

function createCard(item) {
    const col = document.createElement('div');
    col.className = 'col';
  
    col.innerHTML = `
      <div class="card card-custom h-100">
        <div class="card-img-container">
          <img src="${item.image}" alt="${item.title}" />
        </div>
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <h6 class="card-subtitle mb-2 badge badge-author">${item.author}</h6>
          <p class="card-text">${item.description}</p>
        </div>
      </div>
    `;
  
    return col;
  }

  function renderCards(items) {
    cardsContainer.innerHTML = ''; 

    if (items.length === 0) {
        cardsContainer.innerHTML = '<p class="text-center">No results found.</p>';
        return;
    }
    
    items.forEach(item => {
        const card = createCard(item);
        cardsContainer.appendChild(card);
    });
}
