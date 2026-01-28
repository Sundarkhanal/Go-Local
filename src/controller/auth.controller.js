const bcrypt = require("bcryptjs");
const { randomStringGenerater } = require("../utilities/helper");
class AuthController{
    register = (req, res, next) =>{
        let data = req.body;
        data.password = bcrypt.hashSync(data.password)

        if (!req.file) {
            next({code:400, details:{image:"image is required"}, mesasge:"Validation Failed", status:"VALIDATION_FAILED_ERR"})
            
        }else{

            data.image = req.file.filename
            data.emailVerified = false;
            data.otp = randomStringGenerater(6).toUpperCase()
            res.json({
            data: data,
            message:"User registered successfully",
            status: "Ok"
        })

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