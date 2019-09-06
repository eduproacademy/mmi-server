require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/contact-us', (req, res) => {
    const { userName, userEmail, userSubject, userPhone, userMessage } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: "noreply@majumaritim.com",
        to: "hello@majumaritim.com",
        subject: `${userSubject} ${userName} ${userEmail}`,
        html: `
        <head>
            <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'>
        </head>
        <body style='font-family:Verdana;background:#f2f2f2;color:#606060;'>
        
            <style>
                h3 {
                    font-weight: normal;
                    color: #999999;
                    margin-bottom: 0;
                    font-size: 14px;
                }
                a , h2 {
                    color: #6534ff;
                }
                p {
                    margin-top: 5px;
                    line-height:1.5;
                    font-size: 14px;
                }
            </style>
        
            <table cellpadding='0' width='100%' cellspacing='0' border='0'>
                <tr>
                    <td>
                        <table cellpadding='0' cellspacing='0' border='0' align='center' width='100%' style='border-collapse:collapse;'>
                            <tr>
                                <td>
        
                                    <div>
                                        <table cellpadding='0' cellspacing='0' border='0' align='center'  style='width: 100%;max-width:600px;background:#FFFFFF;margin:0 auto;border-radius:5px;padding:50px 30px'>
                                            <tr>
                                                <td width='100%' colspan='3' align='left' style='padding-bottom:0;'>
                                                    <div>
                                                        <h2>New message</h2>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width='100%' align='left' style='padding-bottom:30px;'>
                                                    <div>
                                                        <p>Hello, you've just received a new message via the contact form on your website.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width='100%' align='left' style='padding-bottom:20px;'>
                                                    <div>
                                                        <h3>From</h3>
                                                        <p>${userName}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width='100%' align='left' style='padding-bottom:20px;'>
                                                    <div>
                                                        <h3>Email Address</h3>
                                                        <p>${userEmail}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width='100%' align='left' style='padding-bottom:20px;'>
                                                    <div>
                                                        <h3>Subject</h3>
                                                        <p>${userSubject}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width='100%' align='left' style='padding-bottom:20px;'>
                                                    <div>
                                                        <h3>Phone number (if provided)</h3>
                                                        <p>${userPhone}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width='100%' align='left' style='padding-bottom:20px;'>
                                                    <div>
                                                        <h3>Message</h3>
                                                        <p>${userMessage}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
        
                                    <div style='margin-top:30px;text-align:center;color:#b3b3b3'>
                                        <p style='font-size:12px;'>2019 Maju Maritim Indonesia®, All Rights Reserved.</p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500).json(error)
            console.log(error)
        } else {
            res.status(200).json('Success')
            console.log('success')
        }
    });
})


app.listen(PORT, () => {
    console.log('🔥 App listening on port: ' + PORT);
})
