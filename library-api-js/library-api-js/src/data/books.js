export const books = [
  { id: 1, title: "Node", price: 45000, isAvailable: true },
  { id: 2, title: "Express", price: 52000, isAvailable: true },
  { id: 3, title: "Prisma", price: 61000, isAvailable: false }
];

let nextId = 4;

export function findBookById(id) {
  return books.find((book) => book.id === id);
}

export function searchByTitle(keyword) {
  return books.filter((book) =>
    book.title.toLowerCase().includes(keyword.toLowerCase())
  );
}

export function addBook(input) {
  const book = {
    id: nextId++,
    isAvailable: true,
    ...input
  };
  books.push(book);
  return book;
}

export function updateBook(id, changes) {
  const book = findBookById(id);
  if (!book) return null;
  delete changes.id; // id өөрчлөгдөхөөс хамгаалах
  Object.assign(book, changes);
  return book;
}

export function removeBook(id) {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  return true;
}