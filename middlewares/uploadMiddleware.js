const multer = require("multer");
const path = require("path");


//------------------------------------------------------
//! Путь к временной папке tmp
const tempDir = path.join(__dirname, "../", "tmp");

//! multer-Настройки сохранения файла:
const multerConfig = multer.diskStorage({
    //! временная папка для сохранения файла:
    destination: (req, file, cb) => {
        cb(null, tempDir) //! выбираем папку для сохранения файла и передаем обработку дальше ( типа next() )
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname) //! сохраняем файл с именем originalname и передаем обработку дальше ( типа next() )
    },
    limits: {
        // fileSize: 2048 //! ограничение размера загружаемого файла
    }
});

//! Middleware upload
const uploadMiddleware = multer({
    storage: multerConfig
});

module.exports = uploadMiddleware;