const chatRouter = require("express").Router()
const checkPermission = require("../middleware/auth.middleware")
const chatCtrl = require("../controller/chat.controller")
const validator = require("../middleware/validator.middleware")
const Joi = require("joi")

const ChatDTO = Joi.object({
    message: Joi.string().min(2).max(2000).required(),
    receiver: Joi.string().required()
})

chatRouter.get('/user-list',checkPermission(), chatCtrl.getAllUsers )
chatRouter.post('/', checkPermission(), validator(ChatDTO), chatCtrl.storeChat)
chatRouter.get("/:userId", checkPermission(), chatCtrl.getChatDetail)

module.exports = chatRouter