const express = require('express');
const router = express.Router();
const { cookieJwtAuth } = require("../middleware/cookieJwtAuth");
const path = require('path');


// Apply middleware to all routes in this router
router.use(cookieJwtAuth);

router.use(express.static('app'));

// router

router.get('*', (req, res) => {
    // Debugging statement to check if req.user is set
    res.sendFile(path.join(__dirname + '/..'+'/public/ms-identity-javascript-v2-master/app/index.html'));
});




module.exports = router;
