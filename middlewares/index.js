const validation = require("./validation")
const controllerWrapper = require("./controllerWrapper")
const isValidId = require("./isValidId")
const authMiddleware = require("./authMiddleware")
const uploadMiddleware = require("./uploadMiddleware")
const changeImageByJimpMiddleware = require("./changeImageByJimpMiddleware")


module.exports = {
    validation,
    controllerWrapper,
    isValidId,
    authMiddleware,
    uploadMiddleware,
    changeImageByJimpMiddleware,
}