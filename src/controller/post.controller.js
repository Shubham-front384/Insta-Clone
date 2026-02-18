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

module.exports = {
  postCreateController
}
