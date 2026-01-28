const crypto = require("crypto")

const randomStringGenerater = (len) => {
    return crypto.randomBytes(len).toString("base64").slice(0, len)

}

module.exports = {randomStringGenerater}