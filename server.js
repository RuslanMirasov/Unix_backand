const app = require('./app');

const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const { PORT, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error.messege);
    process.exit(1);
  });
