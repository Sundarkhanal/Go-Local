const express = require("express")

const app = express()
app.get('/',(req, res) => {
    res.json({
        data: "I am from home page",
        message: "Success",
        status: "ok"
    })
})




module.exports = app