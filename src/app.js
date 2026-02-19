const express = require("express");
const cookieParser = require("cookie-parser");

const appRoutes = require("./routes/app.route");
const postRouter = require("./routes/post.route");
const followRouter = require("./routes/follow.route");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", appRoutes);
app.use("/api/post", postRouter);
app.use("/api", followRouter);

module.exports = app;
