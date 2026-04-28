const multer = require("multer")
const fs = require("fs")

const uploader = () => {

    const storageConfig = multer.diskStorage({
        destination: (req, file, cb) => {
            const path = "./public/uploads/"
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true })
            }
            cb(null, path)
        },
        filename: (req, file, cb) => {
            const filename = Date.now() + "-" + file.originalname
            cb(null, filename)
        }
    })

    const customFilefilter = (req, file, cb) => {
        const ext = file.originalname.split(".").pop().toLowerCase()

        if (["img", "jpg", "jpeg", "png", "svg", "bmp", "webp", "gif"].includes(ext)) {
            cb(null, true)
        } else {
            cb({ 
                code: 422, 
                message: "File Format not supported", 
                status: "FILE_FORMAT_NOT_SUPPORTED_ERR" 
            })
        }
    }


    return multer({
        storage: storageConfig,
        fileFilter: customFilefilter,
        limits: {
            fileSize: 5 * 1024 * 1024
        }
    })
}

module.exports = uploader

