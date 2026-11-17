const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Data sementara (in-memory)
let todos = [
  { id: 1, title: "Belajar Express", completed: false },
  { id: 2, title: "Bikin REST API", completed: false },
  { id: 3, title: "Push ke GitHub", completed: true },
];

app.get("/", (req, res) => {
  res.status(200).json({ message: "Todo API is running" });
});

// GET semua todo
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

// GET satu todo berdasarkan id
app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "ID harus berupa angka" });
  }

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo tidak ditemukan" });
  }

  res.status(200).json(todo);
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
