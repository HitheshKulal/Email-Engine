// indexRoute.js
const express = require('express');
const morgan = require('morgan');

const path = require('path');
const { cookieJwtAuth } = require('../../middleware/cookieJwtAuth');
const router = express.Router();
router.use(morgan('dev'));


router.use(express.static('app'));


// Route to serve index.html at the root URL ('/')
router.get('/',cookieJwtAuth,
    (req, res) => {
    res.sendFile(path.join(__dirname, '/app/index.html'));
});

module.exports = router;