const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const booksPath = path.join(__dirname, "books.json");

const getAllBooks = async () => {
  const data = await fs.readFile(booksPath);
  return JSON.parse(data);
};

const getBookById = async (id) => {
  const books = await getAllBooks();
  const result = books.find((book) => book.id === id);
  return result || null;
};

const addNewBook = async (data) => {
  const newBook = {
    id: nanoid(),
    ...data,
  };
  const books = await getAllBooks();
  await books.push(newBook);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return newBook;
};

const updateById = async (id, data) => {
  const books = await getAllBooks();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return null;
  }
  books[index] = { id, ...data };
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return books[index];
};

const deleteBook = async (id) => {
  const books = await getAllBooks();
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = books.splice(index, 1);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return result;
};

module.exports = {
  getAllBooks,
  getBookById,
  addNewBook,
  updateById,
  deleteBook,
};
