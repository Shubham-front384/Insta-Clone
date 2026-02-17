const express = require("express");
const appRoutes = require("./routes/app.route");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use("/api/auth", appRoutes);
app.use(cookieParser());

module.exports = app;
