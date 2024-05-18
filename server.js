const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const router = require('./routes/router');
const multer = require('multer');

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is working fine!');
});

app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})