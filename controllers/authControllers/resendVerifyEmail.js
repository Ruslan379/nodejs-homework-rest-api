const { NotFound, BadRequest } = require('http-errors');
const { User } = require("../../models");

const {
    sendVerificationEmailSendGrid, //?  SendGrid
    sendVerificationEmailNodemailer //todo  Nodemailer 
} = require("../../helpers");


//-----------------------------------------------------------------------------
const resendVerifyEmail = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        throw new NotFound(`Missing required field email`)
    };

    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFound(`User not found`)
    };

    if (user.verify) {
        throw new BadRequest(`Verification has already been passed`)
    };

    //! Отправка письма
    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте (повторное)",
        html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Нажмите для повторного подтверждения вашего EMAIL</a>`
    };

    //? ------------------- SendGrid -------------------
    await sendVerificationEmailSendGrid(mail); //! отправка повторного подтверждениия (верификации) на email пользователя

    //todo ---------------- Nodemailer ----------------
    // await sendVerificationEmailNodemailer(mail); //! отправка повторного подтверждениия (верификации) на email пользователя


    res.json({
        message: "Verification email sent",
        data: { user }
    });
};

module.exports = resendVerifyEmail;