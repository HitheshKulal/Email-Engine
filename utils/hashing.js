const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt


const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

// Function to verify the password
const verifyPassword = async (plainTextPassword, hashedPassword) => {
    try {
        // Compare the provided password with the hashed password
        const match = await bcrypt.compare(plainTextPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
};

// Example usage during login
const verifyUser = async (password, plainTextPassword) => {
    if (user) {
        const isPasswordValid = await verifyPassword(plainTextPassword, user.password);
        if (isPasswordValid) {
            console.log('Login successful');
            return true;
        } else {
            console.log('Invalid credentials');
            return false;
        }
    } else {
        console.log('User not found');
    }
};

module.exports = {
    hashPassword,
    verifyPassword
}



