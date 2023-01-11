const Jimp = require('jimp');


//-----------------------------------------------------------------------------
async function resizeQualByJimp(tempUpload, x, y, quality) {
    const image = await Jimp.read(tempUpload);
    await image
        .resize(x, y)
        .quality(quality) // set JPEG quality
        // .greyscale() // set greyscale
        .writeAsync(tempUpload);
};

module.exports = resizeQualByJimp
