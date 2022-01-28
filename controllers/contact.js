const contactForm = require("../models/contact");
const StatusCodes = require("http-status-codes");
const inbox = require("nodemailer");
const path = require('path');
const config = require(path.resolve('utilities/configuration.js'));
//const mail = require(path.resolve('services/mail/mail.js'));
const {info, success, error } = require("consola");
const { gmailSecret } = require("../utilities/configuration");

const getAllContact = async (req, res) => {
const contacts = await contactForm.find({
})

res.status(StatusCodes.OK).json({contacts,
nbHits: contacts.length})
}

const getContact = async (req, res) => {
const {id: contactID} = req.params
const oneContact = await contactForm.findOne({_id: contactID});

if(! oneContact) {
return res.status(StatusCodes.NOT_FOUND).json({ msg: "contact not found"});
}

res.status(StatusCodes.OK).json({ oneContact})
}

const contactMe = async (req, res) => {
        try {
            let data;
            const oneContact = await contactForm.findOne({email: req.body.email});
            if(!oneContact){
                data = await contactForm.create(req.body);
            }
            data = oneContact;
    
    console.log(data)
     
     //data = `${req.body}`

    const transporter = inbox.createTransport({
        //host: "smtp.gmail.com",
        service: 'gmail',
        port: 587,
        secure: false,
        auth: { 
            user: config.gmailUser,
            pass: config.gmailSecret, 
        },
        logger: true
        })

    //const transporter = inbox.createTransport(transport);

        transporter.verify((error, success) => {
            if (error) {
                //if error happened code ends here
                res.status(StatusCodes.OK).json({message: error})
            } else {
                //this means success
                res.status(StatusCodes.CREATED).json('Ready to send mail!')
            }
            })
    info("sending mail to", config.gmailUser);

const sentInbox = {
    from: data.name,
    to:config.gmailUser,
    replyTo:config.gmailUser,
    subject: 'Thank you for reaching out',
    text: `
      
      ${data.name}

      
       <${data.email}>

      \n
      ${data.message}`,
    }
//60 from:
//63 contact details
//64 email:
//66 message:


    await transporter.sendMail(sentInbox)
        return res.json({message: 'done'})
        } catch (error) {
            console.log(error);
        }
    }



    


module.exports = {
    getAllContact,
    getContact,
    contactMe
}