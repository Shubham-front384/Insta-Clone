const express = require("express");
const appRoutes = require("./routes/app.route");
const cookieParser = require("cookie-parser");

const postRouter = require("./routes/post.route");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", appRoutes);
app.use("/api/post", postRouter);

module.exports = app;
