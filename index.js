const express = require('express');
const axios = require('axios');
const app = express();

const MAILGUN_API_KEY = 'YOUR_MAILGUN_API_KEY';
const MAILGUN_DOMAIN = 'YOUR_MAILGUN_DOMAIN';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/send-email', (req, res) => {
    const { to, subject, text, html } = req.body;

    axios.post(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
        from: 'Your Name <yourname@example.com>',
        to,
        subject,
        text,
        html
    }, {
        auth: {
            username: 'api',
            password: MAILGUN_API_KEY
        }
    })
    .then(response => {
        console.log('Email sent:', response.data);
        res.status(200).json({ message: 'Email sent successfully' });
    })
    .catch(error => {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email' });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
