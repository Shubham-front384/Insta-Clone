const express = require("express");
const followController = require("../controller/follow.controller");
const userDeleteFollowController = require("../controller/follow.controller");
const userCookieRequest = require("../middlewares/post.middleware");

const followRouter = express.Router();

followRouter.post("/follow/:username", userCookieRequest, followController.userFollowController);

followRouter.post("/unfollow/:username", userCookieRequest, followController.userDeleteFollowController);

module.exports = followRouter
