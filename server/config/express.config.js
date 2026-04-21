const express = require("express")
const router = require("../router/router")
const cookieParser = require("cookie-parser")
const errorHandler = require("../middleware/error-handler.middleware")
const mangoInitialize = require("./mango.config")
const cors = require("cors")
const helmet = require("helmet")
const {rateLimit} = require("express-rate-limit")

const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

/// xxs policy
app.use(helmet({
    crossOriginResourcePolicy: {
        policy:"cross-origin"
    }
}))

// limit policy
const limiter = rateLimit({
    windowMs:1*60*1000,   //should be in ms
    limit: 15,
})
app.use(limiter)

app.use(cookieParser())

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