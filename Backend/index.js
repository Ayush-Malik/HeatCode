require("dotenv").config();
require("express-async-errors");

// express app
const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");

// database
const { sequelize } = require("./models/DBConnection");
// next line synchronizes all models [uncomment if you made any changes in the scheams]
// require("./models/syncModels");

// routers
const authRouter = require("./routes/authRoutes");
const problemRouter = require("./routes/problemRoutes");

// middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// ----------------------------------------------------------------
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problem", problemRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// ----------------------------------------------------------------

const port = process.env.PORT || 5000;

const start = async() => {
    try {
        app.listen(port, console.log(`HeatCode is running at PORT = ${port}`));
    } catch (err) {
        console.log(err);
    }
};

start();