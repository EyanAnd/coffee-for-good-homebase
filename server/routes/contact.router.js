const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
// import nodemailer
const nodemailer = require('nodemailer');
const router = express.Router();


// post to send the email to our email.
router.post('/',rejectUnauthenticated, async (req, res) => {
    try {
        const {user_id, name, email, subject, description } = req.body;

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            // Configure your email provider details from environment variables
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_ADMIN,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Compose the email message
        const message = {
            from: `${email}`,
            to: process.env.EMAIL_ADMIN,
            subject: `New Contact Form Submission: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nDescription:\n${description}`,
        };

        // Send the email
        await transporter.sendMail(message);

        const queryText = 'INSERT INTO contact_form (user_id, name, email, subject, description) VALUES ($1, $2, $3, $4, $5)';
        await pool.query(queryText, [user_id, name, email, subject, description]);

        res.sendStatus(200);
    } catch (error) {
        console.log('Error sending email:', error);
        res.sendStatus(500);
    }
});

module.exports = router;