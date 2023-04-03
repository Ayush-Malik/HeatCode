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
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // disable SSL verification in development environment
      },
    },
  }
);

const execute = async (q_number) => {
  const queries = [
    "truncate User;",
    "truncate InstituteDetail;",
    "show tables;",
    "drop table if exists User , Submission , StudentDetail , Problem , InstituteDetail , ContestSubmission , ContestProblem , Contest , Badge;",
    "select * from User;",
    "select * from InstituteDetail;",
  ];

  console.log("--------------------------------------------");
  const [result, metadata] = await sequelize.query(queries[q_number]);
  console.log(result);
  console.log("--------------------------------------------");
};

// test the connection and list all tables in the database
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    execute(4);
    execute(5);

    const [results, metadata] = await sequelize.query("show tables;");
    console.log("Result of testing qury : ", results);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// uncomment next line to test db connecton
testConnection();

module.exports = {
  sequelize,
};
