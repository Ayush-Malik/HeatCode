require("dotenv").config();
require("express-async-errors");

// express app
const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");

// database
const { sequelize } = require("./models/DBConnection");
// next line synchronizes all models [uncomment if you made any changes in the scheams]
// require("./models/syncModels");

// routers
const authRouter = require("./routes/authRoutes");

// middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const { sendVerificationEmail } = require("./utils/send_mail");
sendVerificationEmail("ayushmalik779@gmail.com", "mai token hu");
// ----------------------------------------------------------------
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/v1/auth", authRouter);

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