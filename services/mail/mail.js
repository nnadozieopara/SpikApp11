const inbox = require('nodemailer');
const {StatusCodes} = require('http-status-codes');


const mail = async(req,res) =>{
    const transport = inbox.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { 
            user: config.gmailUser,
            pass: config.gmailSecret }
        })

    const transporter = inbox.createTransport(transport);

        transporter.verify((error, success) => {
            if (error) {
                //if error happened code ends here
                res.status(StatusCodes.OK).json({message: error})
            } else {
                //this means success
                res.status(StatusCodes.CREATED).json('Ready to send mail!')
            }
            })
}

module.exports = mail





