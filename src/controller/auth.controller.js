const mailservice = require("../services/email.service")
const UserModel = require("../models/user.model");
const { createUser } = require("../services/user.service");
const userService = require("../services/user.service");
const { randomStringGenerater } = require("../utilities/helper");
const emailService = require("../services/email.service");
class AuthController{
    register = async(req, res, next) =>{
        try {
            const data = userService.transformData(req)

            const user = await userService.createUser(data)
            await mailservice.sendEmail({
                to: user.email,
                subject: "Activate your account",
                message: userService.getActivateYourAccountMessage({name:user.name, otp:data.otp})
            })


                res.json({
                data: userService.getPublicUserProfile(user),
                message:"User registered successfully",
                status: "Ok"
            })

            }catch (exception) {
                next(exception)
            }
    }

    activateUser = async (req, res, next) => {
        try {
            const{email, otp} = req.body;
            const userDetail = await userService.getSingleUserProfile({
                email: email,
                otp: otp

            })

            if (!userDetail) {
                throw{code:404, message:"User not Found", status:"USER_NOT_FOUND_ERR"}
                
            }
            if (userDetail.otp !== otp) {
                throw{code:400, details: {otp:"OTP code not found"}, message:"Incorrect OTP Code", status:"INCORRECT_OTP_ERR"}
            }
            const otpExpiryTime = userDetail.expiryTime.getTime() //provides timestamps
            const currentTime = Date.now();

            if (otpExpiryTime < currentTime) {
                throw{code:400, details: {otp:"OTP Expired"}, message:"OTP Expired", status:"OTP_EXPIRED_ERR"}
            }

            const update = await userService.updateSingleProfile({
                _id: userDetail._id
            }, {
                otp:null,
                expiryTime:null,
                status:"active"
            })

            res.json({
                data: userService.getPublicUserProfile(update),
                message:"User Activated Successfully",
                status:"ok"
            })

        } catch (exception) {
            next(exception)
            
        }

    }

    resendActivationOTP = async(req, res, next) => {

        try {
            const {email} = req.body;
            
            const userDetail = await userService.getSingleUserProfile({
                email: email,
    

            })
            

            if (!userDetail) {
                throw{code:404, message:"User not Found", status:"USER_NOT_FOUND_ERR"}
                
            }
            // if (userDetail.otp !== otp) {
            //     throw{code:400, details: {otp:"OTP code not found"}, message:"Incorrect OTP Code", status:"INCORRECT_OTP_ERR"}
            // }
            const otpExpiryTime = userDetail.expiryTime.getTime() //provides timestamps
            const currentTime = Date.now();

            if (otpExpiryTime >= currentTime) {
                throw{code:400, details: {otp:"OTP Not Expired"}, message:"OTP Not Expired", status:"OTP_EXPIRED_ERR"}
            }

            const data =  {
                otp:randomStringGenerater(6),
                expiryTime: new Date(Date.now()+6000),
            }

            const update = await userService.updateSingleProfile({
                _id: userDetail._id
            }, data);

            await emailService.sendEmail({
                to:userDetail.email,
                subject:"Re-OTP-Code",
                message:userService.getResendActivationOTP({name: userDetail.name, otp: data.otp})
            })

            res.json({
                data: userService.getPublicUserProfile(update),
                message:"An email has been sent to your registered Account",
                status:"ok"
            })



        } catch (exception) {
            next(exception)
            
        }

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