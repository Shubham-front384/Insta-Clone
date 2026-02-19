const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");
const { ImageKit, toFile } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function postCreateController(req, res) {
  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: 'Test',
    folder: 'cohort-2-insta-clone-posts'
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(200).json({
    msg: "Post created successfully.",
    post
  });
}

async function getPostCreatedController(req, res) {
  let user = req.user;

  const post = await postModel.find({
    user
  });

  res.status(200).json({
    msg: "Post fetched successfully",
    post
  });
}

async function getPostDetailController(req, res) {
  const postId = req.params.postid;

  let userId = user.id;

  let post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      msg: "Post not found."
    });
  }

  const user = post.user.toString() === userId;
  if (!user) {
    return res.status(404).json({
      msg: "Forbidden Content."
    });
  }

  return res.status(200).json({
    msg: "Post fetched  successfully.",
    post
  });
}

module.exports = {
  postCreateController,
  getPostCreatedController,
  getPostDetailController
}
