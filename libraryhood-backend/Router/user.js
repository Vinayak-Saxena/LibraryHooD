
const express = require('express');

// Import controller functions
const { loginUser, signupUser, getAllUsers, removeUser, forgotPassword, resetPassword } = require('../Controllers/userController');

const router = express.Router();

// Route to fetch all users
router.get('/', getAllUsers);

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

// Route to delete a user by ID
router.delete('/:id', removeUser);

// Route to handle forgot password
router.post('/forgot-password', forgotPassword);

// Route to handle password reset
router.post('/reset-password/:id/:token', resetPassword);

module.exports = router;
