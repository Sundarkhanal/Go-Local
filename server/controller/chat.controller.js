const ChatModel = require("../models/chat.model")
const userService = require("../services/user.service")

class ChatController{
    getAllUsers = async(req, res, next)  =>{
        try {
            const loggedInUser = req.loggedInUser
            let filter = {
                _id: {$ne: loggedInUser._id}
            }
            if (req.query.search) {
                filter = {
                    ...filter,
                    name: new RegExp(req.query.search, "i"),
                    email: new RegExp(req.query.search, "i")
                }
            }
            const data = await userService.getAllUserProfile(filter)
            res.json({
                data:data,
                message:"User List",
                status:"ok"
            })
        } catch (exception) {
            next(exception)
        }

    }

    storeChat = async(req, res, next) => {
        try {
            const loggedInUser = req.loggedInUser
            const data = req.body;
            data.sender = loggedInUser._id

            let chat = new ChatModel(data)
            await chat.save()
            chat = await ChatModel.findOne({_id: chat._id})
            .populate(['receiver', ['_id','name','email','address','role','gender','phone']])
            .populate(['sender', ['_id','name','email','address','role','gender','phone']])

            res.json({
                data:chat,
                message:"Chat Sent",
                status:"Ok"
            })
        } catch (exception) {
            next(exception)
        }

    }

    getChatDetail = async(req, res, next) => {
        try {
            const userId = req.params.userId
            const loggedInUser = req.loggedInUser

            let filter = {
                $or: [
                    {sender: loggedInUser._id, receiver:userId},
                    {sender: userId, receiver: loggedInUser._id}
                ]
            }
            const chatList = await ChatModel.find(filter)
            .populate(['receiver', ['_id','name','email','address','role','gender','phone']])
            .populate(['sender', ['_id','name','email','address','role','gender','phone']])

            res.json({
                data: chatList,
                message:"Your Chat List",
                status:"Ok"
            })
            
        } catch (exception) {
            next(exception)
        }
    }
}

module.exports = new ChatController