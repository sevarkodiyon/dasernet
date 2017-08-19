'use strict';
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var constantsVar = require('../utils/constants');
var mailer = function () {
};


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'test@gmail.com', //You need to create this mailbox
        pass: 'test'
    }
}));



mailer.sendVerificationMail = function (email, verificationCode, id, signertype) {
var hh = constantsVar.myURLQ;

email = "amudhavallee@gmail.com";
    // setup email data with unicode symbols
    var mailOptions = {
        from: 'amudhavallee@gmail.com', // sender address
        to: email,
        subject: 'Email Verification ✔', // Subject line
        html: `
<html>
<body>
<pre>
Welcome to Our Company,

To get started, please click on the below link to confirm your email:
http://[hostname]/customer/everify?di=[id]&vc=[recovery_token]&st=[signer_type]

Regards,
Admin
</pre>
</body>
</html>`
    };

    mailOptions.html = mailOptions.html.replace('[id]', id);
    mailOptions.html = mailOptions.html.replace('[hostname]', hh.hostname+":"+hh.port);    
    mailOptions.html = mailOptions.html.replace('[recovery_token]', verificationCode);
    mailOptions.html = mailOptions.html.replace('[signer_type]', signertype);    

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};

module.exports = mailer;
