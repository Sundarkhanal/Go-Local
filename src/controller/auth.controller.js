

const UserModel = require("../models/user.model");
const { createUser } = require("../services/user.service");
const userService = require("../services/user.service");
class AuthController{
    register = async(req, res, next) =>{
        try {
            const data = userService.transformData(req)

            const user = await userService.createUser(data)

                res.json({
                data: userService.getPublicUserProfile(user),
                message:"User registered successfully",
                status: "Ok"
            })

            }catch (exception) {
                next(exception)
            }
    }

    activateUser = (req, res, next) => {
        res.json({
            data:"User activated successfully",
            message:"user activated",
            status: "Ok"
        })

    }

    login = (req, res, next) => {
        res.json({
            data:"user loggedin",
            message:"Loggedin successfully",
            status:"Ok"
        })
    }

    getLoggedInUser = (req,res, next) => {
        
    }

}



module.exports = new AuthController()