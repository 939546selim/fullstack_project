const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Fake "Database"
let users = [
  { id: 1, name: "Selim", age: 25, city: "Kolkata" },
  { id: 2, name: "Rohim", age: 30, city: "Delhi" },
  { id: 3, name: "Karim", age: 28, city: "Bangalore" },
];

// 🟢 READ all users
app.get("/users", (req, res) => {
  res.json(users);
});

// 🟢 READ single user (path param)
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// 🟢 CREATE new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  console.log(newUser)
  if (!newUser.name || !newUser.age || !newUser.city)
    return res.status(400).json({ message: "Missing fields" });

  newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(newUser);
  res.status(201).json({ message: "User added", user: newUser });
});

// 🟢 UPDATE user
app.patch("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ message : "User not found" });

  users[index] = { ...users[index], ...req.body };
  res.json({ message: "User updated", user: users[index] });
});

// 🟢 DELETE user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
