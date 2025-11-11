const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// In-memory data storage
let users = [
  { id: 1, name: 'Selim', age: 39 },
  { id: 2, name: 'Ayaan', age: 22 }
];

// 1️⃣ GET - Read all users
app.get('/users', (req, res) => {
  res.json(users);
});

// 2️⃣ POST - Add a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  console.log(newUser)
  users.push(newUser);
  res.json({ message: 'User added successfully', data: users });
});

// 3️⃣ PATCH - Update user
app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updateData = req.body;
  users = users.map(user => user.id === id ? { ...user, ...updateData } : user);
  res.json({ message: 'User updated', data: users });
});

// 4️⃣ DELETE - Remove user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.json({ message: 'User deleted', data: users });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
