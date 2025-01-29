// Load liquor list for display and editing
let liquorList = [];

function loadLiquorList() {
  fetch('liquor-list.json')
    .then(response => response.json())
    .then(data => {
      liquorList = data;
      displayLiquorList();
    })
    .catch(error => console.error('Error loading liquor list:', error));
}

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

// Save liquor list (simulate saving to a backend)
function saveLiquorList() {
  // For now, we'll just log the updated list
  console.log('Updated Liquor List:', liquorList);
  // In a real app, you'd send this data to a backend to save to liquor-list.json
}

// Load liquor list when the page loads
document.addEventListener('DOMContentLoaded', loadLiquorList);
