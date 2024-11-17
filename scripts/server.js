const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(bodyParser.json());

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email provider (e.g., Gmail, Yahoo, etc.)
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password', // Replace with your email password or app password
    },
});

// Endpoint to handle email sending
app.post('/send-email', async (req, res) => {
    res.send("CORS enabled!");
    const { name, email, date } = req.body;

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com', // Replace with the email address where you want to receive messages
        subject: `Message from ${name}`,
        text: `You have a new message from ${name} (${email}):\n\n${date}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
