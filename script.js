// Load inventory data from localStorage
let inventory = JSON.parse(localStorage.getItem('inventory')) || {
  wineCabinet: [],
  behindTheBar: { beer: [], liquor: [], wine: [] },
  storage: { beer: [], liquor: [], wine: [] }
};

// Load liquor list for display and editing
let liquorList = JSON.parse(localStorage.getItem('liquorList')) || [];

// Display liquor list on the front page
function displayLiquorList() {
  const liquorListElement = document.getElementById('liquor-list');
  if (liquorListElement) {
    liquorListElement.innerHTML = '';
    liquorList.forEach((liquor, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${liquor}</span>
        <button onclick="editLiquor(${index})">Edit</button>
        <button onclick="removeLiquor(${index})">Remove</button>
      `;
      liquorListElement.appendChild(listItem);
    });
  }
}

// Display current inventory on the front page
function displayCurrentInventory() {
  const currentInventoryElement = document.getElementById('current-inventory');
  if (currentInventoryElement) {
    currentInventoryElement.innerHTML = '';
    // Wine Cabinet
    inventory.wineCabinet.forEach(wine => {
      const listItem = document.createElement('li');
      listItem.textContent = `Wine Cabinet: ${wine.name} - ${wine.bottleCount} bottles`;
      currentInventoryElement.appendChild(listItem);
    });
    // Behind the Bar
    inventory.behindTheBar.beer.forEach(beer => {
      const listItem = document.createElement('li');
      listItem.textContent = `Behind the Bar (Beer): ${beer.name} - ${beer.bottleCount} bottles, Keg: ${beer.kegPercentage * 100}%`;
      currentInventoryElement.appendChild(listItem);
    });
    inventory.behindTheBar.liquor.forEach(liquor => {
      const listItem = document.createElement('li');
      listItem.textContent = `Behind the Bar (Liquor): ${liquor.name} (${liquor.type}) - ${liquor.bottleCount} bottles, ${liquor.bottlePercentage * 100}% full`;
      currentInventoryElement.appendChild(listItem);
    });
    inventory.behindTheBar.wine.forEach(wine => {
      const listItem = document.createElement('li');
      listItem.textContent = `Behind the Bar (Wine): ${wine.name} - ${wine.bottleCount} bottles`;
      currentInventoryElement.appendChild(listItem);
    });
    // Storage
    inventory.storage.beer.forEach(beer => {
      const listItem = document.createElement('li');
      listItem.textContent = `Storage (Beer): ${beer.name} - ${beer.caseCount} cases, ${beer.bottleCount} bottles`;
      currentInventoryElement.appendChild(listItem);
    });
    inventory.storage.liquor.forEach(liquor => {
      const listItem = document.createElement('li');
      listItem.textContent = `Storage (Liquor): ${liquor.name} (${liquor.type}) - ${liquor.caseCount} cases, ${liquor.bottleCount} bottles`;
      currentInventoryElement.appendChild(listItem);
    });
    inventory.storage.wine.forEach(wine => {
      const listItem = document.createElement('li');
      listItem.textContent = `Storage (Wine): ${wine.name} - ${wine.caseCount} cases, ${wine.bottleCount} bottles`;
      currentInventoryElement.appendChild(listItem);
    });
  }
}

// Add new liquor
document.getElementById('add-liquor-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const newLiquor = document.getElementById('new-liquor').value.trim();
  if (newLiquor && !liquorList.includes(newLiquor)) {
    liquorList.push(newLiquor);
    displayLiquorList();
    document.getElementById('new-liquor').value = ''; // Clear input
    saveLiquorList();
  }
});

// Edit liquor
function editLiquor(index) {
  const newName = prompt('Enter the new name for this liquor:', liquorList[index]);
  if (newName && newName.trim()) {
    liquorList[index] = newName.trim();
    displayLiquorList();
    saveLiquorList();
  }
}

// Remove liquor
function removeLiquor(index) {
  if (confirm('Are you sure you want to remove this liquor?')) {
    liquorList.splice(index, 1);
    displayLiquorList();
    saveLiquorList();
  }
}

// Save liquor list to localStorage
function saveLiquorList() {
  localStorage.setItem('liquorList', JSON.stringify(liquorList));
}

// Save inventory to localStorage
function saveInventory() {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  displayLiquorList();
  displayCurrentInventory();
