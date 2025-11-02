// OpenAI (no date) HTML + CSS + javascript, ChatGPT. 
//Available at: https://chatgpt.com/g/g-JOJBoNrCa-html-css-javascript (Accessed: 01 December 2024). 

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/database');
const userRoutes = require('./routes/UserRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', userRoutes);

// Database sync and server start
sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((error) => {
    console.error('Failed to synchronize database:', error);
  });
