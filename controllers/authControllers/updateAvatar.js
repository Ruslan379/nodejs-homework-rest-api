const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");


//----------------------------------------------------------------------------------
//! ПОЛНЫЙ путь к папке назначения всех файлов-аватарок
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");


const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { id: userId } = req.user
    const avatarNewJimpName = `Jimp_${userId}_${originalname}`;

    try {
        //! ПОЛНЫЙ путь к новому Jimp-файлу аватара в папке назначения
        const resultUpload = path.join(avatarsDir, avatarNewJimpName);

        //! ПЕРЕИМЕНОВАНИЕ и ПЕРЕМЕЩЕНИЕ файла аватара с временноцй папки tmp в папку назначения E:\GoIT\Code\goit-node-hw-05\public\avatars
        await fs.rename(tempUpload, resultUpload);

        //! ОТНОСИТЕЛЬНЫЙ путь к новому Jimp-файлу аватара в папке назначения
        const avatarURL = path.join("public", "avatars", avatarNewJimpName);

        //! ЗАПИСЬ URL аватарки в MongoDB
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        // await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });

        res.json({ avatarURL });

    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};


module.exports = updateAvatar;