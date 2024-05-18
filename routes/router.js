const express = require('express');
const csvUpload = require('../controllers/csvUpload');
const emails = require('../controllers/emails');
const unSubscribe = require('../controllers/unsubscribe');
const createList = require('../controllers/createList');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/create-list', createList);
router.post('/:listId/upload-users', upload.single('file'), csvUpload);
router.post('/:listId/send-emails', emails);
router.get('/unsubscribe/:userId', unSubscribe);

module.exports = router;