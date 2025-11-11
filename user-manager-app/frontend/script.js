const BASE_URL = "http://localhost:3000";
const output = document.getElementById("output");

// Buttons
const showAllBtn = document.getElementById("showAll");
const addUserBtn = document.getElementById("addUser");
const updateUserBtn = document.getElementById("updateUser");
const deleteUserBtn = document.getElementById("deleteUser");

// 🟢 Get All Users
showAllBtn.addEventListener("click", () => {
  fetch(`${BASE_URL}/users`)
    .then((res) => res.json())
    .then(showUsers)
    .catch((err) => showError(err));
});

// 🟢 Add User
addUserBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const city = document.getElementById("city").value;

  if (!name || !age || !city) return alert("All fields required!");

  const newUser = { name, age: parseInt(age), city };

  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  const data = await res.json();
  alert(data.message);
});

// 🟢 Update User
updateUserBtn.addEventListener("click", async () => {
  const id = document.getElementById("updateId").value;
  const name = document.getElementById("updateName").value;

  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  const data = await res.json();
  alert(data.message);
});

// 🟢 Delete User
deleteUserBtn.addEventListener("click", async () => {
  const id = document.getElementById("deleteId").value;

  const res = await fetch(`${BASE_URL}/users/${id}`, { method: "DELETE" });
  const data = await res.json();
  alert(data.message);
});

// Helper Functions
function showUsers(users) {
  output.innerHTML = users
    .map(
      (u) =>
        `<p><b>${u.id}. ${u.name}</b> — Age: ${u.age}, City: ${u.city}</p>`
    )
    .join("");
}

function showError(err) {
  output.innerHTML = `<p style="color:red;">${err}</p>`;
}
