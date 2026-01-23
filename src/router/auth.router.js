const authRouter = require("express").Router()
const authCtrl = require("../controller/auth.controller")
const uploader = require("../middleware/uploader.middleware")

authRouter.post('/register', uploader().single("image"), authCtrl.register )
authRouter.get('/activate-user', authCtrl.activateUser)
authRouter.post('/login', authCtrl.login)
authRouter.get('/me', authCtrl.getLoggedInUser)






module.exports = authRouter