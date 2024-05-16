const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const books = require("./books");

const booksAction = async ({ action, id, title, author }) => {
  switch (action) {
    case "read":
      const allBooks = await books.getAllBooks();
      return console.log(allBooks);
    case "getById":
      const oneBook = await books.getBookById(id);
      return console.log(oneBook);
    case "add":
      const newBook = await books.addNewBook({ title, author });
      return console.log(newBook);
    case "updateById":
      const updateBook = await books.updateById(id, { title, author });
      return console.log(updateBook);
    case "delete":
      const deletedBook = await books.deleteBook(id);
      return console.log(deletedBook);
    default:
      return console.log("Unknown comand");
  }
};

// booksAction({ action: "read" });
// booksAction({ action: "delete", id: "2f3g4h5i6j" });
// booksAction({ action: "getById", id: "sdssdsdsd" });
// booksAction({
//   action: "add",
//   title: "От кого мы произошли",
//   author: "Э. Мульдашев",
// });
// booksAction({
//   action: "updateById",
//   id: "0r1s2t3u4v",
//   title: "Harry Potter",
//   author: "J. K. Rowling",
// });

// ПОДКЛЮЧЕНИЕ НАШИХ ЭКШЕНОВ, ЧТОБ МОЖНО БЫЛО ВЫЗЫВАТЬ ИХ ИЗ КОМАНДНОЙ СТРОКИ

// Это без библиотеки YARGS
// const actionIndex = process.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   booksAction({ action });
// }

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
booksAction(argv);
