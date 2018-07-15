var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
    }
});

function send(to, subject, text) {
    console.log("send mail to:" + to);
    var mailOptions = {
        from: 'mytradingbotalert@gmail.com', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: '<p>' + text + '</p>'// plain text body
    }
    
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
    });
}



module.exports = {
 	send: send
};

