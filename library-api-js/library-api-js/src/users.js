// src/app.js
import express from "express";
import {
  searchByTitle,
  getBooksFromDb,
  getBookOrThrow
} from "./books.js";
import { users, findUserById } from "./users.js";

const app = express();
const PORT = 3000;

// 1. Эхний route
app.get("/", (req, res) => {
  res.json({
    message: "Library API",
    version: "1.0.0"
  });
});

// 2. Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime()
  });
});

// 3. User profile route
app.get("/profile", (req, res) => {
  res.json({
    name: "Bat",
    role: "USER",
    email: "bat@example.com"
  });
});

// 4. Books route (Async/Await ба query хайлт)
app.get("/books", async (req, res) => {
  const q = req.query.q;
  if (q) {
    return res.json(searchByTitle(q));
  }

  const booksFromDb = await getBooksFromDb();
  res.json(booksFromDb);
});

// 5. Books ID route (Try/Catch ба 404 алдаа барих)[
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

// 6. Users route (Бүх хэрэглэгчдийг нууц үггүйгээр буцаах)
app.get("/users", (req, res) => {
  const safeUsers = users.map(({ passwordHash, ...safeUser }) => safeUser);
  res.json(safeUsers);
});

// 7. Users ID route (ID-аар хайж 404 шалгах, нууц үггүйгээр буцаах)
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { passwordHash, ...safeUser } = user;
  res.json(safeUser);
});

// Сервер ажиллуулах
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});