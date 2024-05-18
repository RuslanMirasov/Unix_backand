const app = require('./app');

const mongoose = require('mongoose');

const PORT = 7777;
const DB_HOST = 'mongodb+srv://mirasovdev:8TvtxxDXVu6332d3@unix.acgy0lj.mongodb.net/unix?retryWrites=true&w=majority&appName=Unix';

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful');
    });
  })
  .catch(error => {
    console.log(error.messege);
    process.exit(1);
  });
