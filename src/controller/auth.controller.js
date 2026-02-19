const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      msg: "User already exists " + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists"),
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage
  });

  const token = jwt.sign({
    id: user._id,
    username: user.username
  }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("token", token);

  res.status(201).json({
    msg: "User created successfully",
    user: {
      username: user.username,
      email: user.email,
      profileImage: user.profileImage
    }
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      { username },
      { email }
    ]
  });

  if (!user) {
    return res.status(404).json({
      msg: "User not found"
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password invalid"
    });
  }

  const token = jwt.sign({
    id: user._id,
    username: user.username
  }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("token", token)

  res.status(200).json({
    msg: "User login successfully",
    user: {
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    }
  });
}

module.exports = {
  registerController,
  loginController
}
