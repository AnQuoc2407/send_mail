const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());  // Parse JSON bodies

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use Gmail's SMTP server
    auth: {
        user: 'nguyenhuuanquoc2407@gmail.com',  // Your email
        pass: 'bjog qazz jffc qdgz',  // Your email password (use environment variables in production)
    },
});

// POST route to handle sending email
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'nguyenhuuanquoc2407@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
