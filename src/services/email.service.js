const nodemailer = require("nodemailer")
const { smtpConfig } = require("../config/config")
class EmailService{
    #transport
    constructor(){
        try {
            this.#transport = nodemailer.createTransport({
                host:smtpConfig.host,
                port:smtpConfig.port,
                service:smtpConfig.provider,
                auth:{
                    user: smtpConfig.user,
                    pass: smtpConfig.password,
                    
                },
                
            })
            console.log(smtpConfig.user, smtpConfig.password);
            console.log("****SMTP server connected Successfully! ****");
            
            
        } catch (exception) {
            console.error("***SMTP  server not connected...***")
            throw{code: 500, message: exception.message ?? "SMTP server connection error", status:"SMTP_SERVER_CONNECTION_ERR"}
            
        }
    }

    async sendEmail({to, subject, message}){
        try {
            return await this.#transport.sendMail({
                to:to,
                from:smtpConfig.from,
                subject:subject,
                html:message
            })

        } catch (exception) {
            console.log(exception);
            
            throw{code: 500, message: exception.message ?? "Email sending failed.", status: "SMTP_MAIL_SENDING_ERR"}
            
        }
    }
}

module.exports = new EmailService()