const API_URL = 'http://localhost:3000/users';
const output = document.getElementById('output');

// GET request
async function getUsers() {
  const res = await fetch(API_URL);
  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
}

// POST request
async function addUser() {
  const newUser = { id: Date.now(), name: 'New User', age: 25 };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  });
  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
}

// PATCH request
async function updateUser() {
  const updatedUser = { name: 'Updated Name', age: 40 };
  const res = await fetch(`${API_URL}/1`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser)
  });
  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
}

// DELETE request
async function deleteUser() {
  const res = await fetch(`${API_URL}/1`, { method: 'DELETE' });
  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
}
