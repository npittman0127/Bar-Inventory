// Load inventory data from inventory.json
let inventory = {};

function loadInventory() {
  fetch('inventory.json')
    .then(response => response.json())
    .then(data => {
      inventory = data;
      updateDisplay();
    })
    .catch(error => console.error('Error loading inventory:', error));
}

// Function to update the display based on the current inventory
function updateDisplay() {
  // Update Wine Cabinet
  const wineList = document.getElementById('wine-list');
  wineList.innerHTML = '';
  inventory.wineCabinet.forEach(wine => {
    const listItem = document.createElement('li');
    listItem.textContent = `${wine.name}: ${wine.bottleCount} bottles`;
    wineList.appendChild(listItem);
  });

  // Update Behind the Bar
  const barList = document.getElementById('bar-list');
  barList.innerHTML = '';
  inventory.behindTheBar.beer.forEach(beer => {
    const listItem = document.createElement('li');
    listItem.textContent = `${beer.name}: ${beer.bottleCount} bottles, Keg: ${beer.kegPercentage * 100}%`;
    barList.appendChild(listItem);
  });
  inventory.behindTheBar.liquor.forEach(liquor => {
    const listItem = document.createElement('li');
    listItem.textContent = `${liquor.type}: ${liquor.bottleCount} bottles, ${liquor.bottlePercentage * 100}% full`;
    barList.appendChild(listItem);
  });
  inventory.behindTheBar.wine.forEach(wine => {
    const listItem = document.createElement('li');
    listItem.textContent = `${wine.name}: ${wine.bottleCount} bottles`;
    barList.appendChild(listItem);
  });

  // Update Storage
  const storageList = document.getElementById('storage-list');
  storageList.innerHTML = '';
  inventory.storage.beer.forEach(beer => {
    const listItem = document.createElement('li');
    listItem.textContent = `${beer.name}: ${beer.caseCount} cases, ${beer.bottleCount} bottles`;
    storageList.appendChild(listItem);
  });
  inventory.storage.liquor.forEach(liquor => {
    const listItem = document.createElement('li');
    listItem.textContent = `${liquor.type}: ${liquor.caseCount} cases, ${liquor.bottleCount} bottles`;
    storageList.appendChild(listItem);
  });
  inventory.storage.wine.forEach(wine => {
    const listItem = document.createElement('li');
    listItem.textContent = `${wine.name}: ${wine.caseCount} cases, ${wine.bottleCount} bottles`;
    storageList.appendChild(listItem);
  });
}

// Load inventory when the page loads
document.addEventListener('DOMContentLoaded', loadInventory);
