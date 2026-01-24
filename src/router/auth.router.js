const authRouter = require("express").Router()
const authCtrl = require("../controller/auth.controller")
const uploader = require("../middleware/uploader.middleware")
const RegisterDTO = require("../rules/auth.rule")
const validator = require("../middleware/validator.middleware")


authRouter.post('/register', uploader().single("image"), validator(RegisterDTO), authCtrl.register )
authRouter.get('/activate-user', authCtrl.activateUser)
authRouter.post('/login', authCtrl.login)
authRouter.get('/me', authCtrl.getLoggedInUser)






module.exports = authRouter