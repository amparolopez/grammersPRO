const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  postText: { type: String, require: true },
  postImage: { type: String },
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  comments: [
    {
      comment: { type: String, required: true },
      user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    },
  ],
  commentDate: { type: Date, default: Date.now, require: true },
});


const Post = mongoose.model("post", postSchema);

module.exports = Post;
