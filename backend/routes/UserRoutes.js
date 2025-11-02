// OpenAI (no date) HTML + CSS + javascript, ChatGPT. 
//Available at: https://chatgpt.com/g/g-JOJBoNrCa-html-css-javascript (Accessed: 01 December 2024). 

const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
