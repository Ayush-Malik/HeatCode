require("dotenv").config();
const express = require("express");
const app = express();

// -----------------------------------------
app.get("/", (req, res) => {
    res.send("Welcome to HeatCode!!!");
});
// -----------------------------------------

const port = process.env.PORT || 5000;

const start = async() => {
    try {
        app.listen(port, console.log(`HeatCode is running at PORT = ${port}`));
    } catch (err) {
        console.log(err);
    }
};

start();