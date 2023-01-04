const mongoose = require("mongoose");

const app = require('./app')


//----------------------------------------------------------------
const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT))
  .then(() => console.log(`Server is running on the port: ${PORT}`.bgGreen.red))
  .then(() => console.log(`Start HW-5`.bgRed.green))
  .then(() => console.log("Database connection successful".bgBlue.yellow))
  .then(() => console.log("---------------------------------------".yellow))
  .catch(error => {
    console.log(error.message);
    process.exit(1); //? закрыть все неиспользуемые процессы
  });
