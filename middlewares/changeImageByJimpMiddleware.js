const { resizeQualByJimp } = require("../helpers")


//----------------------------------------------------------------
const changeImageByJimpMiddleware = async (req, res, next) => {

    const { path: tempUpload } = req.file;

    await resizeQualByJimp(tempUpload, 250, 250, 60);

    next();
};

module.exports = changeImageByJimpMiddleware;
