//Source: Getting started | Sequelize. (2024, November 22). https://sequelize.org/docs/v6/getting-started/
const { Sequelize } = require("sequelize");
// Configure Sequelize
const sequelize = new Sequelize('banana_game', 'admin', '20DavidSwat!', {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Disable SQL query logging in console
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = { sequelize };


