require("dotenv").config();
const { Sequelize } = require("sequelize");

// create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // disable SSL verification in development environment
      },
    },
  }
);

// test the connection and list all tables in the database
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    const [results, metadata] = await sequelize.query("SHOW TABLES;");
    console.log("Result of testing qury : ", results);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// uncomment next line to test db connecton
// testConnection();

module.exports = {
  sequelize,
};
