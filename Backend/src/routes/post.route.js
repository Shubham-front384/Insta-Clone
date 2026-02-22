const express = require("express");
const postController = require("../controller/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const userCookieRequest = require("../middlewares/post.middleware");

const postRouter = express.Router();

postRouter.post('/', upload.single("image"), userCookieRequest, postController.postCreateController);

postRouter.get('/', userCookieRequest, postController.getPostCreatedController);

postRouter.get('/details/:postid', userCookieRequest, postController.getPostDetailController);

module.exports = postRouter;
