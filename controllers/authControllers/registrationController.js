const { User } = require("../../models/userModel.js");
const { Conflict } = require("http-errors");

const bcrypt = require("bcryptjs")
//* gravatar
const gravatar = require("gravatar");

//-----------------------------------------------------------------------------
const registrationController = async (req, res) => {
    const { email, password } = req.body;
    const userMailCheck = await User.findOne({ email });

    //! ПРОВЕРКА - если email уже используется кем-то другим:
    if (userMailCheck) {
        throw new Conflict(`Email ${email} in use`)
    }

    //! ------------------------ Хеширование и засолка password --------------------------

    //* gravatar
    const avatarURL = gravatar.url(email);

    //? 3-вариант (самый сложный)
    //!  Хеширование и засока password с помошью bcryptjs (или bcrypt) используется в userSchema
    const newUser = new User({ email, avatarURL }); //* gravatar
    await newUser.setPassword(password);
    await newUser.save();
    //! _______________________ Хеширование и засолка password _________________________

    console.log("\nnewUser:".green, newUser); //!

    res.status(201).json({
        // status: "success",
        code: 201,
        user: {
            email,
            subscription: newUser.subscription,
            avatarURL //* gravatar
        }
    });
};


module.exports = registrationController;


