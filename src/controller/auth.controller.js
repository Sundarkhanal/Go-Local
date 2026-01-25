class AuthController{
    register = (req, res, next) =>{
        let data = req.body;
            res.json({
            data: data,
            message:"User registered successfully",
            status: "Ok"
        })
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