const mailservice = require("../services/email.service")
const UserModel = require("../models/user.model");
const { createUser } = require("../services/user.service");
const userService = require("../services/user.service");
class AuthController{
    register = async(req, res, next) =>{
        try {
            const data = userService.transformData(req)

            const user = await userService.createUser(data)
            await mailservice.sendEmail({
                to: user.email,
                subject: "Activate your account",
                message:`<!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <title>Your OTP Code</title>
            </head>
            <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4fdf6;">

            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4fdf6; padding: 20px 0;">
                <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); overflow:hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color:#d4f7d4; text-align:center; padding: 30px;">
                        <h1 style="margin:0; font-size:24px; color:#2e7d32;">Welcome to Our Platform!</h1>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px; text-align:center; color:#333333; font-size:16px; line-height:1.5;">
                        <p>Hello <strong>${user.name}</strong>,</p>
                        
                        <p>Thank you for joining us! To get started, please use the OTP below to verify your account:</p>
                        
                        <!-- OTP Code -->
                        <p style="font-size:28px; font-weight:bold; color:#2e7d32; margin:30px 0; letter-spacing:3px;">
                            ${data.otp}
                        </p>
                        
                        <p style="font-size:16px; color:#555555; margin-top:20px;">
                            Your journey to learning and growth begins here. Unlock the full potential of our platform and explore exciting opportunities waiting just for you!
                        </p>
                        
                        <p style="font-size:14px; color:#555555; margin-top:20px;">
                            This OTP is valid for the next 10 minutes. Please do not share it with anyone.
                        </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#d4f7d4; text-align:center; padding:20px; font-size:12px; color:#2e7d32;">
                        &copy; 2026 Your Company Name. All rights reserved.
                        </td>
                    </tr>
                    
                    </table>
                </td>
                </tr>
            </table>

            </body>
            </html>
            `
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