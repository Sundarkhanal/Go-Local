const express = require("express")
const router = require("../router/router")
const errorHandler = require("../middleware/error-handler.middleware")
const mangoInitialize = require("./mango.config")

const app = express()
mangoInitialize()

//body parsher
app.use(express.json({
    limit:"5mb"
}))
app.use(express.urlencoded({
    limit:"5mb"
}))

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