const PostController = require("../controllers/postController");
const Router = require("express").Router();
const validator = require("../config/validator");
const userControllers = require("../controllers/userControllers");
const passport = require("../config/passport");
const multer = require("multer");
const path = require('path')

const { addUser, signIn, startWithToken, getUser, obtenerAdmin, adminBan, adminBanPost } = userControllers;
const {
  getAllPosts,
  postAPost,
  deleteAPost,
  editAPost,
  likeDislikePost,
  postACommentary,
  getCommentaries,
  editCommentary,
  deleteCommentary,
} = PostController;

Router.route("/post")
  .get(getAllPosts)
  .post(postAPost);

Router.route("/post/:id").delete(deleteAPost).put(editAPost);

Router.route("/comments/:id")
  .get(getCommentaries)
  .post(passport.authenticate("jwt", { session: false }), postACommentary)
  .put(passport.authenticate("jwt", { session: false }), editCommentary)
  .delete(passport.authenticate("jwt", { session: false }), deleteCommentary)
Router.route("/user/signup").post(validator, addUser).get(getUser)

Router.route("/user/signin").post(signIn);


Router.route("/user/signin/token").get(
  passport.authenticate("jwt", { session: false }),
  startWithToken
);

Router.route("/post/like/:id")
.put(likeDislikePost);

// Routes Admin

Router.route("/users")
  .get(getUser)
  .put(obtenerAdmin)
  .delete(adminBan)

  Router.route("/admin/post")
  .delete(adminBanPost)
// Router.route("/admin/user").delete(adminBan)

module.exports = Router;