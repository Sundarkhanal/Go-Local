const register = (req, res) =>{
    res.json({
        data:"This is registerd data",
        message:"User registered successfully",
        status: "Ok"
    })
}

const activateUser = (req, res) => {
    res.json({
        data:"User activated successfully",
        message:"user activated",
        status: "Ok"
    })

}

const login = (req, res) => {
    res.json({
        data:"user loggedin",
        message:"Loggedin successfully",
        status:"Ok"
    })
}

module.exports = {register, activateUser, login}