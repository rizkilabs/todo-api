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

// POST tambah todo baru
app.post("/todos", (req, res) => {
  const { title } = req.body;

  // Validasi: title wajib ada, harus string, dan tidak boleh kosong
  if (typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ message: "Title wajib diisi dan harus berupa teks" });
  }

  // Bikin id baru: id terbesar + 1 (aman walau ada todo yang pernah dihapus)
  const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

  const newTodo = {
    id: newId,
    title: title.trim(),
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// PUT ubah todo berdasarkan id
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "ID harus berupa angka" });
  }

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo tidak ditemukan" });
  }

  const { title, completed } = req.body;

  if (title === undefined && completed === undefined) {
    return res
      .status(400)
      .json({ message: "Kirim minimal title atau completed" });
  }

  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim() === "")
  ) {
    return res
      .status(400)
      .json({ message: "Title harus berupa teks dan tidak boleh kosong" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ message: "Completed harus berupa true atau false" });
  }

  // Semua valid, baru update
  if (title !== undefined) todo.title = title.trim();
  if (completed !== undefined) todo.completed = completed;

  res.status(200).json(todo);
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
