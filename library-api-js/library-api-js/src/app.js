// src/app.js
import express from "express";
import {
  searchByTitle,
  getBooksFromDb,
  getBookOrThrow
} from "./books.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Library API", version: "1.0.0" });
});

// GET /books (Async/Await болон query хайлт)[cite: 100, 102]
app.get("/books", async (req, res) => {
  const q = req.query.q;
  if (q) {
    return res.json(searchByTitle(q));
  }
  
  const booksFromDb = await getBooksFromDb();
  res.json(booksFromDb);
});

// GET /books/:id (Try/Catch ба 404 алдаа барих)[cite: 100, 103]
app.get("/books/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = getBookOrThrow(id);
    res.json(book);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});