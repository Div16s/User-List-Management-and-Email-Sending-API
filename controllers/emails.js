const nodemailer = require('nodemailer');
const List = require('../models/List');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const baseUrl = "https://user-list-management-and-email-sending.onrender.com";
const subject = 'Welcome to MathonGo!';

const sendMail = async (req, res) => {
    try {
        const { listId } = req.params;

        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        const users = await User.find({ listId, unsubscribed: false });
        if (!users.length) {
            return res.status(404).json({
                error: 'No users found'
            });
        }

        const emails = users.map(user => {
            let emailBody = `
            <p>Hey <strong>[name]</strong>!</p>
            <p>Thank you for subscribing to our platform. Here are your subscription details:</p>
            <ul>
                <li><strong style="color: black;">Name:</strong> <span style="color: green;">[name]</span></li>
                <li><strong style="color: black;">Email:</strong> <span style="color: green;">[email]</span></li>
                <li><strong style="color: black;">City:</strong> <span style="color: green;">[city]</span></li>
            </ul>
            <p>We're excited to have you on board and can't wait to help you advance your skills.</p>
            <p>If you wish to unsubscribe, please click <a href="[baseUrl]/api/unsubscribe/[id]" style="color: red; font-weight: bold;">here</a>.</p>
            <p><strong style="color: blue;">Best regards,<br>Team MathonGo</strong></p>
        `;

            emailBody = emailBody.replace(/\[name\]/g, user.name);
            emailBody = emailBody.replace(/\[email\]/g, user.email);
            emailBody = emailBody.replace(/\[city\]/g, user.customProperties.city);
            emailBody = emailBody.replace(/\[id\]/g, user._id);
            emailBody = emailBody.replace(/\[baseUrl\]/g, baseUrl);

            return {
                from: process.env.EMAIL,
                to: user.email,
                subject,
                html: emailBody,
            };
        });

        await Promise.all(emails.map(email => transporter.sendMail(email)));

        res.json({
            status: 'Emails sent successfully'
        });
    }
    catch (error) {
        console.error('Error sending emails:', error.message);
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = sendMail;
