const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const nodemailer = require('nodemailer');
const router = express.Router();

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

router.get('/',rejectUnauthenticated, async (req, res) => {
    try {
        const queryText = `SELECT * FROM contact_form;`;
        const response = await pool.query(queryText)
        res.send(response.rows)
    } catch (error) {
        console.log('there was an error GETTING all of the contact forms', error)
    }
})


module.exports = router;