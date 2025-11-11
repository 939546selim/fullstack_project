const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors()); // allow frontend to call backend
app.use(express.json());

// Fake "Database"
const users = [
  { id: 1, name: "Selim", age: 25, city: "Kolkata" },
  { id: 2, name: "Rohim", age: 30, city: "Delhi" },
  { id: 3, name: "Karim", age: 28, city: "Bangalore" },
  { id: 4, name: "Amina", age: 27, city: "Chennai" }
];

// ✅ 1️⃣ Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// ✅ 2️⃣ Get single user (Path Param)
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// ✅ 3️⃣ Filter by city (Query Param)
app.get("/filter", (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ message: "Please provide a city" });
  const filtered = users.filter(u => u.city.toLowerCase() === city.toLowerCase());
  res.json(filtered);
});

app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
