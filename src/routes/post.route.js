const express = require("express");
const postController = require("../controller/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

postRouter.post('/', upload.single("image"), postController.postCreateController);

postRouter.get('/', postController.getPostCreatedController);

postRouter.get('/details/:postid', postController.getPostDetailController);

module.exports = postRouter;
