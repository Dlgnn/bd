import express from "express";
import booksRouter from "./routes/books.router.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();
const PORT = 3000;

// Body parser болон logger middleware
app.use(express.json());
app.use(logger);

// Router холбох (/books префикс)
app.use("/books", booksRouter);

// 404 болон Global Error Handler (Үргэлж хамгийн доор байх ёстой)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});