const { User } = require("../../models/userModel.js");
const { Unauthorized } = require("http-errors");

const bcrypt = require("bcryptjs")

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;


//-----------------------------------------------------------------------------
const loginController = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    //! ОШИБКА Unauthorized - если пароль или email неверный
    //? 2-вариант (с использованием метода "Сравнение паролей" в userSchema)
    if (!user || !user.comparePassword(password)) {
        throw new Unauthorized("Email or password is wrong");
    }

    //! Проверка пользователя на верификацию его email
    if (!user.verify) {
        throw new Unauthorized(`Email not verified`)
    };

    //! Создаем ТОКЕН
    const payload = { id: user._id, email: user.email, };
    const token = jwt.sign(payload, JWT_SECRET);
    // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); //! Временный - 1 час

    // user.token = token
    //! Обновляем поле "token" в MongoDB --> db-contacts.users
    user = await User.findByIdAndUpdate(user._id, { token }, { new: true });

    console.log("\nuser:".yellow, user); //!
    console.log("token:".red, token.green); //!
    console.log("");

    res.status(200).json({
        // status: "success",
        code: 200,
        data: {
            token,
            user: {
                email,
                subscription: user.subscription
            }
        }
    })
};


module.exports = loginController
