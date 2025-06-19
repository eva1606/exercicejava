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

function loadItems() {
    fetch('data/items.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then(items => {
        allItems = items; 
        renderCards(allItems); 
      })
      .catch(error => {
        errorContainer.textContent = `Failed to load items. Please try again later. : ${error.message}`;
      });
  }

  function sortItems(items, sortBy) {
    return items.slice().sort((a, b) => {
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title);
      } else if (sortBy === 'author-asc') {
        return a.author.localeCompare(b.author);
      } else if (sortBy === 'author-desc') {
        return b.author.localeCompare(a.author);
      }
      return 0;
    });
  }


  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();

    const filteredItems = allItems.filter(item => 
        item.title.toLowerCase().includes(searchText) ||
        item.author.toLowerCase().includes(searchText)
        );

        renderCards(filteredItems);
});

sortSelect.addEventListener('change', () => {
    const searchText = searchInput.value.toLowerCase();
  
    const filteredItems = allItems.filter(item =>
      item.title.toLowerCase().includes(searchText) ||
      item.author.toLowerCase().includes(searchText)
    );
  
    const sortedItems = sortItems(filteredItems, sortSelect.value);
  
    renderCards(sortedItems);
  });