const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  postTitle:{type:String, require:true},
  postText: { type: String, require: true },
  postImage: { type: String },
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  comments: [
    {
      comment: { type: String, required: true },
      user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    },
  ],
  date: { type: Date, default: Date.now, require: true },
  like:[{user:{ type:mongoose.Types.ObjectId, ref:'user',}}]
});


const Post = mongoose.model("post", postSchema);

module.exports = Post;
