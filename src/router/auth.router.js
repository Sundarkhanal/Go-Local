const authRouter = require("express").Router()
const authCtrl = require("../controller/auth.controller")
const uploader = require("../middleware/uploader.middleware")
const {RegisterDTO, OTPVerifyDTO, LoginDTO }= require("../rules/auth.rule")
const validator = require("../middleware/validator.middleware")
const checkPermission = require("../middleware/auth.middleware")


authRouter.post('/register', uploader().single("image"), validator(RegisterDTO), authCtrl.register )
authRouter.post('/activate-user',validator(OTPVerifyDTO), authCtrl.activateUser)
authRouter.post("/resend-otp", validator(OTPVerifyDTO), authCtrl.resendActivationOTP)
authRouter.post('/login', validator(LoginDTO), authCtrl.login)
authRouter.post('/me',checkPermission, authCtrl.getLoggedInUser)






module.exports = authRouter