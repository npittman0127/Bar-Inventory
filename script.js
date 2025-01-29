// Example for wine-cabinet.html
document.getElementById('wine-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const wineName = document.getElementById('wine-name').value;
  const wineCount = document.getElementById('wine-count').value;

  // Save to localStorage (or use a backend in the future)
  localStorage.setItem(wineName, wineCount);

  // Update the displayed list
  updateInventoryList();
});

function updateInventoryList() {
  const wineList = document.getElementById('wine-list');
  wineList.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const listItem = document.createElement('li');
    listItem.textContent = `${key}: ${value} bottles`;
    wineList.appendChild(listItem);
  }
}

// Load inventory on page load
updateInventoryList();
