const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config()
require("colors");
const path = require('path')

const authRouter = require('./routes/api/authRouter.js');
const contactsRouter = require('./routes/api/contactsRouter');
// const usersRouter = require('./routes/api/usersRouter');

// const filesRouter = require('./routes/api/filesRouter'); //?


//----------------------------------------------------------------
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
// app.use(express.static("public")); //! Чтобы Express мог раздавать статические файлы из папки "/public"

//!++++++++++++++++++++++++++ static ++++++++++++++++++++++++++++++
// const FILE_DIR = path.resolve("./public/output")

//! serve static
// app.use("/", express.static("public"));
// app.use("/public", express.static("public"));
// app.use("/public/avatars", express.static("public/avatars"));
app.use("/avatars", express.static("public/avatars"));

//! 1-вариант --> в filesRouter.js --> router.use("/download", express.static(FILE_DIR))
// app.use("/api/files/download", express.static(FILE_DIR)) //! 2-вариант

//! files
// app.use('/api/files', filesRouter) //?
//!+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// app.use('/api/users/current', usersRouter)
app.use('/api/users', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  console.log("!!! ОШИБКА !!!:".bgRed.white) //!
  console.log('Такой маршрут не найден...'.bgYellow.red) //!
  res.status(404).json({ message: 'Route not found' })
})


app.use((err, req, res, next) => {
  const { status = 500, message = "Server ERROR" } = err;
  //! ===========================console============================
  console.log("!!! ОШИБКА !!!:".bgRed.white);
  console.error(err.message.red);
  console.log("");
  //! ==============================================================
  res.status(status).json({ message: err.message });
})


module.exports = app
