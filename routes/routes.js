const PostController = require("../controllers/postController");
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  })
const Router = require("express").Router();
const { getAllPosts, postAPost } = PostController;

Router.route("/post").get(getAllPosts).post(upload.single('postImage'),postAPost);

module.exports = Router;
