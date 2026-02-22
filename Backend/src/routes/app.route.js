const express = require("express");
const authController = require("../controller/auth.controller");

const appRoutes = express.Router();

appRoutes.post("/register", authController.registerController);

appRoutes.post("/login", authController.loginController);

module.exports = appRoutes;
