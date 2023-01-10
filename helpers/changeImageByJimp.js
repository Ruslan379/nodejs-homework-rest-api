const Jimp = require('jimp');


//-----------------------------------------------------------------------------
async function resize250ByJimp(tempUpload) {
    const image = await Jimp.read(tempUpload);
    await image
        .resize(250, 250)
        // .quality(60) // set JPEG quality
        // .greyscale() // set greyscale
        .writeAsync(tempUpload);
};

async function resize400ByJimp(tempUpload) {
    const image = await Jimp.read(tempUpload);
    await image
        .resize(400, 400)
        // .quality(60) // set JPEG quality
        // .greyscale() // set greyscale
        .writeAsync(tempUpload);
};

async function resize250Qual60ByJimp(tempUpload) {
    const image = await Jimp.read(tempUpload);
    await image
        .resize(250, 250)
        .quality(60) // set JPEG quality
        // .greyscale() // set greyscale
        .writeAsync(tempUpload);
};

async function resize250GreyByJimp(tempUpload) {
    const image = await Jimp.read(tempUpload);
    await image
        .resize(250, 250)
        // .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .writeAsync(tempUpload);
};

async function resize250Qual60GreyByJimp(tempUpload) {
    const image = await Jimp.read(tempUpload);
    await image
        .resize(250, 250)
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .writeAsync(tempUpload);
};

module.exports = {
    resize250ByJimp,
    resize400ByJimp,
    resize250Qual60ByJimp,
    resize250GreyByJimp,
    resize250Qual60GreyByJimp,
};