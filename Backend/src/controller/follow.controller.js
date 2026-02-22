const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function userFollowController(req, res) {
  const followUser = req.user.username;
  const followingUser = req.params.username;

  const isUserFollow = await followModel.findOne({
    follower: followUser,
    following: followingUser,
  });
  if (isUserFollow) {
    return res.status(200).json({
      msg: `${followUser} already follow ${followingUser}.`,
    });
  }

  if (isUserFollow) {
    if (isUserFollow.status === 'Accepted') {
      return res.status(404).json({
        msg: 'User already followed',
      });
    }
    
    if (isUserFollow.status === 'Pending') {
      return res.status(404).json({
        msg: 'Follow request is already pending',
      });
    }

    if (isUserFollow.status === 'Rejected') {
      const follow = await followModel.findByIdAndUpdate(
        isUserFollow._id,
        {
          status: 'Pending',
        },
        { new: true }
      );
      return res.status(200).json({
        message: `${followUser} follow request again sent to ${followingUser} successfully`,
      });
    }
  }

  if (followUser === followingUser) {
    return res.status(400).json({
      msg: `${followUser} you can not follow your own id.`,
    });
  }

  const isUserFollowing = await userModel.findOne({
    username: followingUser,
  });
  if (!isUserFollowing) {
    return res.status(404).json({
      msg: `${followingUser} user does not exists.`,
    });
  }

  const userFollow = await followModel.create({
    follower: followUser,
    following: followingUser,
  });

  res.status(201).json({
    msg: `${followUser} following ${followingUser}.`,
    userFollow,
  });
}

async function userDeleteFollowController(req, res) {
  const followUser = req.user.username;
  const followingUser = req.params.username;

  const isUserFollow = await followModel.findOne({
    follower: followUser,
    following: followingUser,
  });

  if (!isUserFollow) {
    return res.status(200).json({
      msg: `You are not following ${followingUser}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollow._id);

  res.status(200).json({
    msg: `You have unfollowed ${followingUser}`,
  });
}

module.exports = {
  userFollowController,
  userDeleteFollowController,
};
