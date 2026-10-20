// Эвдэрсэн app.js
import express from "express";
import booksRouter from "./routes/books.router";

const app express();

app.use(notFound);
app.use(booksRouter);

function logger (req, res) {
  console.log(req.method, req.url);
}
app.use(logger);

app.use(express.json());

app.listen(3000);

// Зассан app.js
import express from "express";
import booksRouter from "./routes/books.router.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler }
  from "./middlewares/error.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/books", booksRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(3000);