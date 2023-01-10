const { changeImageByJimp } = require("../helpers")

const {
    resize250ByJimp,
    resize400ByJimp,
    resize250Qual60ByJimp,
    resize250GreyByJimp,
    resize250Qual60GreyByJimp
} = changeImageByJimp


//----------------------------------------------------------------
const changeImageByJimpMiddleware = async (req, res, next) => {

    const { path: tempUpload } = req.file;

    await resize250ByJimp(tempUpload);
    // await resize400ByJimp(tempUpload);
    // await resize250Qual60ByJimp(tempUpload);
    // await resize250GreyByJimp(tempUpload);
    // await resize250Qual60GreyByJimp(tempUpload);

    next();
};

module.exports = changeImageByJimpMiddleware;
