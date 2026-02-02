require("dotenv").config()

const dbConfig = {
    mangodb: {
        url: process.env.MANGODB_URL,
        name: process.env.MANGODB_NAME,

    }
}

const smtpConfig = {
    provider: process.env.SMTP_PROVIDER,
    user: process.env.SMTP_USER,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM
}

module.exports = {
    dbConfig,
    smtpConfig
}