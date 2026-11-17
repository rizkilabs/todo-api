const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware biar bisa baca body JSON dari request
app.use(express.json());

// Route cek server jalan
app.get("/", (req, res) => {
  res.status(200).json({ message: "Todo API is running" });
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
