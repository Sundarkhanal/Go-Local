const crypto = require("crypto")

const randomStringGenerater = (len) => {
    return crypto.randomBytes(len).toString("base64").slice(0, len)

}

const generateEsewaSignature = ({total_amount, transaction_uuid, product_code}) => {
    const secret = "8gBm/:&EnhH.1/q" 
    const message =`total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`
    const hash = crypto.createHmac("sha256", secret)
    .update(message)
    .digest("base64")

    return hash
}

module.exports = {randomStringGenerater, generateEsewaSignature}