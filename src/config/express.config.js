const express = require("express")
const router = require("../router/router")
const errorHandler = require("../middleware/error-handler.middleware")

const app = express()

//body parsher
app.use(express.json())
app.use(express.urlencoded())

app.use('/api/v1',router);

app.use('assets/', express.static('./public/uploads/'))  

app.use((req, res, next) => {
    next({
        code:404,
        details:null,
        message: "Not Found",
        status: "NOT_FOUND_ERR"
    })
})




//global error handling middleware
app.use(errorHandler)




module.exports = app