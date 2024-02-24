const nodemailer =  require('nodemailer')

const sendEmail = async(data)=>{
    const transporter =nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'officialmusicss11@gmail.com',
            pass: 'zjdprzidvchtbkcw'
        }
    })
    const mailOptions = ({
        from: "CLI Share <cli@gmail.com>",
        to:data.gmail,
        subject: data.subject,
        text:data.message,
        attachments: data.files
    })
    await transporter.sendMail(mailOptions)
}
module.exports = sendEmail