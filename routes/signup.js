// routes/signup.js
const express = require('express');
const router = express.Router();
const {indexDocumentUser } = require("../config/elasticSearch");
const {hashPassword} =  require("../utils/hashing");

// GET request handler for /signup
router.get('/', (req, res) => {
    res.render('signup'); // Assumes you have a signup.hbs file in your views directory
});

// POST request handler for /signup
router.post('/', async (req, res) => {
    const { name, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create user object
        const user = {
            name: name,
            password: hashedPassword
        };

        // Index the user document in Elasticsearch
        await indexDocumentUser({ user});

        // Respond with success
        // res.status(200).json({ message: 'User created successfully' });
        res.render('login'); // Assumes you have a signup.hbs file in your views directory

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
