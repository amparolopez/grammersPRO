require('dotenv').config()
const express = require("express");
const cors = require('cors')
const Router = require('./routes/routes')
require('./config/database')
const app = express()
const multer = require("multer");
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "./frontend/src/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./frontend/src/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

  const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use(cors())
app.use(express.json())
app.set('port', process.env.PORT || 4000)

app.use('/api', Router)

app.listen(app.get('port'), () => {
    console.log('server is listening on port ', app.get('port'))
})