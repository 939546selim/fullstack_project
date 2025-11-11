const BASE_URL = "http://localhost:3000";

// Get elements
const output = document.getElementById("output");
const showAllBtn = document.getElementById("showAll");
const searchByIdBtn = document.getElementById("searchById");
const filterByCityBtn = document.getElementById("filterByCity");

// ✅ 1️⃣ Show all users
showAllBtn.addEventListener("click", () => {
  fetch(`${BASE_URL}/users`)
    .then(res => res.json())
    .then(data => showUsers(data))
    .catch(err => showError(err));
});

// ✅ 2️⃣ Find user by ID (path param)
searchByIdBtn.addEventListener("click", () => {
  const id = document.getElementById("userIdInput").value;
  if (!id) return alert("Please enter an ID!");

  fetch(`${BASE_URL}/users/${id}`)
    .then(res => res.json())
    .then(user => {
      if (user.message) return showError(user.message);
      showUsers([user]); // show single user as array
    })
    .catch(err => showError(err));
});

// ✅ 3️⃣ Filter by city (query param)
filterByCityBtn.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city!");

  fetch(`${BASE_URL}/filter?city=${city}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) return showError("No users found for this city!");
      showUsers(data);
    })
    .catch(err => showError(err));
});

// Helper Functions
function showUsers(users) {
  output.innerHTML = users
    .map(u => `<p><b>${u.id}. ${u.name}</b> — Age: ${u.age}, City: ${u.city}</p>`)
    .join("");
}

function showError(err) {
  output.innerHTML = `<p style="color:red;">${err}</p>`;
}
