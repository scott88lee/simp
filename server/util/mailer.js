const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // no need to set host or port etc.
    auth: {
        user: process.env['GMAIL_USER'],
        pass: process.env['GMAIL_PWD']
    }
});

// point to the template folder
const templateOptions = {
    viewEngine: {
        defaultLayout: false,
        extname: 'hbs',
    },
    viewPath: path.resolve('./server/views/emails'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(templateOptions));

module.exports = {
    sendWelcome: async (email) => {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Mighty SIMP 👻" <nodemailer8838@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Welcome, new user sign-up", // plain text body
            html: "<b>Welcome new user</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
    },

    sendVerify: async (email) => {
        let mailOptions = {
            from: '"SIMPLIFI" <nodemailer8838@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Welcome!',
            template: 'welcome', // the name of the template file i.e email.handlebars
            context: {
                name: "Adebola", // replace {{name}} with Adebola
                company: 'My Company' // replace {{company}} with My Company
            }
        };

        // trigger the sending of the E-mail
        try {
            let info = await transporter.sendMail(mailOptions);
            console.log(info)
        } catch (error) {
            console.log(error);
        }
    }
}