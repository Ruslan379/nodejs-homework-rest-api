const { User } = require("../../models/userModel.js");
const { Conflict } = require("http-errors");

const bcrypt = require("bcryptjs")
//* gravatar
const gravatar = require("gravatar");

const { nanoid } = require("nanoid");

const {
    sendVerificationEmailSendGrid,    //?  SendGrid
    sendVerificationEmailNodemailer  //todo  Nodemailer 
} = require("../../helpers");


//-----------------------------------------------------------------------------
const registrationController = async (req, res) => {
    const { email, password } = req.body;
    const userMailCheck = await User.findOne({ email });


    //! ПРОВЕРКА - если email уже используется кем-то другим:
    if (userMailCheck) {
        throw new Conflict(`Email ${email} in use`)
    }


    //* gravatar
    const avatarURL = gravatar.url(email);


    //? ------------------ SendGrid -------------------
    //todo -------------- Nodemailer ------------------
    const verificationToken = nanoid();


    //! ------------------------ Хеширование и засолка password --------------------------
    //? 3-вариант (самый сложный)
    //!  Хеширование и засока password с помошью bcryptjs (или bcrypt) используется в userSchema
    const newUser = new User({ email, avatarURL, verificationToken }); //* gravatar + SendGrid or Nodemailer
    await newUser.setPassword(password);
    await newUser.save();
    //! _______________________ Хеширование и засолка password _________________________


    console.log("\nnewUser:".green, newUser);
    console.log("");


    //? ------------------ SendGrid -------------------
    //todo -------------- Nodemailer ------------------
    const mail = {
        to: email,
        // from: META_EMAIL, //? Use the email address or domain you verified above
        // from: SENDGRID_EMAIL, //? Use the email address or domain you verified above
        subject: 'Подтверждение регистрации на сайте',
        // text: '...and easy to do anywhere, even with Node.js and Nodemailer',
        html: `<a href = "http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Нажмите для подтверждения вашего EMAIL</a>`,
    };

    //? ------------------ SendGrid -------------------
    // await sendVerificationEmailSendGrid(mail); //! отправка подтверждениия (верификации) на email пользователя

    //todo -------------- Nodemailer ------------------
    await sendVerificationEmailNodemailer(mail); //! отправка подтверждениия (верификации) на email пользователя


    res.status(201).json({
        code: 201,
        user: {
            email,
            subscription: newUser.subscription,
            avatarURL //* gravatar
        }
    });
};

module.exports = registrationController;


