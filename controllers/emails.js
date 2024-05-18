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

const sendMail = async (req, res) => {
    const { listId } = req.params;
    const { subject, body } = req.body;

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
        let personalizedBody = body;
        Object.keys(user.customProperties).forEach(key => {
            const regex = new RegExp(`\\[${key}\\]`, 'g');
            personalizedBody = personalizedBody.replace(regex, user.customProperties[key]);
        });

        personalizedBody = personalizedBody.replace(/\[name\]/g, user.name)
            .replace(/\[email\]/g, user.email)
            .replace(/\[id\]/g, user._id.toString());

        return {
            from: process.env.EMAIL,
            to: user.email,
            subject,
            text: personalizedBody,
            html: `<p>${personalizedBody.replace(/\n/g, '<br>')}</p>`,
        };
    });

    await Promise.all(emails.map(email => transporter.sendMail(email)));

    res.json({ status: 'Emails sent successfully' });
};

module.exports = sendMail;
