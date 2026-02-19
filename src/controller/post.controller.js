const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");
const { ImageKit, toFile } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function postCreateController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      msg: "Token not provided, Unauthorized access"
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      msg: "user not authorized"
    });
  }

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: 'Test',
    folder: 'cohort-2-insta-clone-posts'
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(200).json({
    msg: "Post created successfully.",
    post
  });
}

async function getPostCreatedController(req, res) {
  const token = req.cookies.token;
  
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      msg: "Token invalid."
    });
  }

  let user = decoded.id;

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

  const token = req.cookies.token;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      msg: "Invalid Token"
    });
  }

  let userId = decoded.id;

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
