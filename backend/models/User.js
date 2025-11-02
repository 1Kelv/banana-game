// OpenAI (no date) HTML + CSS + javascript, ChatGPT. 
//Available at: https://chatgpt.com/g/g-JOJBoNrCa-html-css-javascript (Accessed: 01 December 2024). 

const { Sequelize, DataTypes } = require('sequelize'); // Ensure Sequelize is imported
const { sequelize } = require('../config/database'); // Import sequelize instance

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW, // Fix here: Ensure Sequelize is referenced correctly
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW, // Fix here
    onUpdate: Sequelize.NOW,
  },
});

module.exports = User;


