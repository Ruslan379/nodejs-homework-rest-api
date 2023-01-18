const mongoose = require("mongoose");

const app = require('./app')


//----------------------------------------------------------------
const { DB_HOST, PORT = 3000 } = process.env;

//! 1-вариант OLD
// mongoose.connect(DB_HOST)
//   .then(() => app.listen(PORT))
//   .then(() => console.log(`Server is running on the port: ${PORT}`.bgGreen.red))
//   .then(() => console.log(`Start HW-5`.bgRed.green))
//   .then(() => console.log("Database connection successful".bgBlue.yellow))
//   .then(() => console.log("---------------------------------------".yellow))
//   .catch(error => {
//     console.log(error.message);
//     process.exit(1); //? закрыть все неиспользуемые процессы
//   });

//! 3-вариант NEW
// async function main() {
(async () => {
  try {
    await mongoose.connect(DB_HOST);
    app.listen(PORT);
    console.log(`Server is running on the port: ${PORT} `.bgGreen.red);
    console.log(`Start HW-6 `.bgRed.blue);
    console.log("Database connection successful ".bgBlue.yellow);
    console.log("---------------------------------------".yellow);
  } catch (error) {
    console.log(error.message);
    process.exit(1); //? закрыть все неиспользуемые процессы
  }
})();