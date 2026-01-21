const authRouter = require("express").Router()
const authCtrl = require("../controller/auth.controller")

authRouter.post('/register', authCtrl.register )
authRouter.get('/activate-user', authCtrl.activateUser)
authRouter.post('/login', authCtrl.login)






module.exports = authRouter