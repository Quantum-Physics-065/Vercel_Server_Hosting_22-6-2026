const express = require('express');
const { registerUser, loginUser } = require('../services/authService');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      ...result
    });
  } catch (error) {
    const status = error.message === 'Email already exists'
      ? 409
      : error.message === 'All fields are required'
        ? 400
        : 500;

    res.status(status).json({
      success: false,
      message: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      ...result
    });
  } catch (error) {
    const status = error.message === 'User not found'
      ? 404
      : error.message === 'Invalid credentials'
        ? 401
        : error.message === 'Email and password are required'
          ? 400
          : 500;

    res.status(status).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
