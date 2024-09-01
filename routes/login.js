// routes/login.js
const express = require('express');
const router = express.Router();
const { searchUserIndex } = require("../config/elasticSearch");
const {verifyPassword} = require("../utils/hashing");
const jwt = require("jsonwebtoken");



router.get("/", (req, res) => {
    res.render("login");
});

router.post('/', async (req, res) => {
    const { name, password } = req.body;

    try {
        // Search for the user in the index
        const result = await searchUserIndex(name);

        // Handle case where no user is found
        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Extract user document and password
        const userDoc = result[0]._source;
        const storedPassword = userDoc.password;

        // Verify the provided password against the stored hashed password
        const isPasswordValid = await verifyPassword(password, storedPassword);
        const token = jwt.sign({ name }, "mySuperSecretKey", { expiresIn: "1h" });

        console.log("tocken ..............")
        console.log(token)
        // Respond based on password validity
        if (isPasswordValid) {
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'Strict'
            });            
            return res.redirect('/'); // Redirect to home directory
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        // console.error('Error during login:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
