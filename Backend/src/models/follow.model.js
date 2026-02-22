const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  follower: {
    type: String
  },
  following: {
    type: String
  },
  status: {
    type: String,
    enum: {
      values: ["Pending", "Accepted", "Rejected"],
      msg: "Status can only be pending accepted or rejected"
    },
    default: "Pending"
  }
}, { timestamps: true });

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const followModel = mongoose.model("follow", followSchema);

module.exports = followModel
