const jwt = require('jsonwebtoken');

// Middleware to check JWT from cookie
const cookieJwtAuth = (req, res, next) => {
    // Check for the token in cookies
    const token = req.cookies.token;

    if (!token) {
        // If no token, clear cookie and redirect to login
        res.clearCookie('token');
        return res.redirect('/login');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'mySuperSecretKey'); // Replace with your secret key or use env variable
        req.user = decoded; // Add decoded user data to request object
        console.log("Decoded JWT:", decoded); // Debugging statement
        next(); // Proceed to the next middleware or route handler
    } catch (ex) {
        // If token is invalid, clear cookie and redirect to login
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

module.exports = { cookieJwtAuth };
