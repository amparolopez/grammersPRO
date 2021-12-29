const Post = require("../models/Post.js");

const PostController = {
  getAllPosts: async (req, res) => {
    try {
      const post = await Post.find();
      res.json({ success: true, response: post });
    } catch (error) {
      res.json({ success: false, response: error });
    }
  },
  postAPost: async (req, res) => {
    
    const { postTitle, postText,postImage, user, comments, commentDate, like } = req.body;
    console.log(postTitle, postText, postImage)
    let post = await new Post({
      postTitle,
      postText,
      postImage,
      user,
      comments,
      commentDate,
      like
    });
    try {
      await post.save();
    } catch (error) {
      res.json({
        success: false,
      });
    }
    res.json({
      res: post,
      success: true,
    });
  },
  deleteAPost: async (req, res) => {
    let post;
    const id = req.params.id;
    try {
        post = await Post.findOneAndDelete({ _id: id });
    } catch (error) {
        res.json({
            res: error,
            success: false,
          });
    }
    res.json({
      res: post,
      success: true,
    });
  },
  editAPost: async (req, res) => {
    let id = req.params.id;
    let post = req.body;
    let update;
    try {
      update = await Post.findOneAndUpdate({ _id: id }, { ...post });
    } catch (error) {
        res.json({
            res: error,
            success: false,
          });
    }
    res.json({
      res: itinerary,
      success: true,
    });
  },
  likeDislike: async (req, res) => {
    const postId = req.params.id;
    const { user, like } = req.body;
    const userId = user._id;
    let updateLike;
    try {
      if (!like) {
        updateLike = { $push: { like: { user: userId } } };
      } else {
        updateLike = { $pull: { like: { user: userId } } };
      }
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        updateLike,
        { new: true }
      );
      res.json({ success: true, response: post.like });
    } catch (error) {
      res.json({ success: false });
    }
  },
  postACommentary: async (req, res) => {
    const postId = req.params.id;
    const { comment, user } = req.body;

    try {
      postedComment = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: { comment, user } } },
        { new: true }
      ).populate("comments.user");
      const comments = postedComment.comments.map((comment) => ({
        comment: { text: comment.comment, _id: comment._id },
        user: {
          name: comment.user.name,
          imageURL: comment.user.imageURL,
          surname: comment.user.surname,
          userId: comment.user._id,
        },
      }));
      res.json({ success: true, response: comments });
    } catch (error) {
      res.json({ success: false, response: error });
    }
  },
  getCommentaries: async (req, res) => {
    try {
      const postId = req.params.id;
      let post = await Post.findOne({ _id: postId }).populate(
        "comments.user"
      );
      const comments = post.comments.map((comment) => ({
        comment: { text: comment.comment, _id: comment._id },
        user: {
          name: comment.user.name,
          imageURL: comment.user.imageURL,
          surname: comment.user.surname,
          userId: comment.user._id,
        },
      }));
      res.json({ success: true, response: comments });
    } catch (error) {
      res.json({ success: false, response: [{ comment: "Error" }] });
    }
  },
  editCommentary: async (req, res) => {
    let commentaryToUpdate;
    let commentId = req.params.id;
    const newComment = req.body.message;
    try {
      commentaryToUpdate = { "comments._id": commentId };
      update = { "comments.$.comment": newComment };
      const updatedComment = await Post.findOneAndUpdate(
        commentaryToUpdate,
        update,
        { new: true }
      ).populate("comments.user");
      const comments = updatedComment.comments.map((comment) => ({
        comment: { text: comment.comment, _id: comment._id },
        user: {
          name: comment.user.name,
          imageURL: comment.user.imageURL,
          surname: comment.user.surname,
          userId: comment.user._id,
        },
      }));
      res.json({ success: true, response: comments });
    } catch (error) {
      console.error(error);
      res.json({ success: false, response: [{ comment: "Error" }] });
    }
  },
  deleteCommentary: async (req, res) => {
    let commentaryToDelete;
    let update;
    const commentId = req.params.id;
    try {
      commentaryToDelete = { "comments._id": commentId };
      update = { $pull: { comments: { _id: commentId } } };
      const deletedComment = await Post.findOneAndUpdate(
        commentaryToDelete,
        update,
        {
          new: true,
        }
      ).populate("comments.user");
      const comments = deletedComment.comments.map((comment) => ({
        comment: { text: comment.comment, _id: comment._id },
        user: {
          name: comment.user.name,
          imageURL: comment.user.imageURL,
          surname: comment.user.surname,
          userId: comment.user._id,
        },
      }));
      res.json({ success: true, response: comments });
    } catch (error) {
      res.json({ success: false, response: [{ comment: "Error" }] });
    }
  },
};

module.exports = PostController;
