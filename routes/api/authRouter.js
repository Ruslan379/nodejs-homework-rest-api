const express = require('express')
const router = express.Router()

const { validation, controllerWrapper, authMiddleware } = require("../../middlewares")

const { authControllers: ctrl } = require("../../controllers")

const {
    registerJoiSchema,
    loginJoiSchema,
    changeSubscriptionJoiSchema
} = require("../../models/userModel.js");

const validateMiddlewareRegister = validation(registerJoiSchema);
const validateMiddlewarelogin = validation(loginJoiSchema);
const validateMiddlewareChangeSubscription = validation(changeSubscriptionJoiSchema);

//-----------------------------------------------------------------------------
//! 1. Регистрация
router.post("/signup", validateMiddlewareRegister, controllerWrapper(ctrl.registrationController))


//! 2. Login
router.post('/login', validateMiddlewarelogin, controllerWrapper(ctrl.loginController))


//! 3-1. Проверка токена
// router.use(authMiddleware); //! 1-вариант

//! 3-2. Logout
// router.get('/logout', controllerWrapper(ctrl.logoutController)) //! 1-вариант
router.get('/logout', authMiddleware, controllerWrapper(ctrl.logoutController)) //! 2-вариант


//! 4. Текущий пользователь - получить данные юзера по токену
// router.get('/current', controllerWrapper(ctrl.getCurrentController)) //! 1-вариант
router.get('/current', authMiddleware, controllerWrapper(ctrl.getCurrentController)) //! 2-вариант


//! 5. Обновление подписки (subscription) пользователя
router.patch('/', authMiddleware, validateMiddlewareChangeSubscription, controllerWrapper(ctrl.updatePatchUserSubscription)) //! 2-вариант


// module.exports = { authRouter: router }
module.exports = router
