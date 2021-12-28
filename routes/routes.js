const PostController = require("../controllers/postController");
const multer = require("multer");
const path = require("path");
const Router = require("express").Router();
const validator = require("../config/validator");
const userControllers = require("../controllers/userControllers");
const passport = require("../config/passport");

const { addUser, signIn, startWithToken } = userControllers;
const {
  getAllPosts,
  postAPost,
  deleteAPost,
  editAPost,
  likeDislike,
  postACommentary,
  getCommentaries,
  editCommentary,
  deleteCommentary,
} = PostController;

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../frontend/public/uploads"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

Router.route("/post")
  .get(getAllPosts)
  .post(upload.single("postImage"), postAPost);
Router.route("/post/:id").delete(deleteAPost).put(editAPost);

Router.route("/comments/:id")
  .get(getCommentaries)
  .post(passport.authenticate("jwt", { session: false }), postACommentary)
  .put(passport.authenticate("jwt", { session: false }), editCommentary)
  .delete(passport.authenticate("jwt", { session: false }), deleteCommentary)
  
Router.route("/user/signup").post(validator, addUser);

Router.route("/user/signin").post(signIn);

Router.route("/user/signin/token").post(
  passport.authenticate("jwt", { session: false }),
  startWithToken
);

Router.route("/like/:id").put(likeDislike);

module.exports = Router;
