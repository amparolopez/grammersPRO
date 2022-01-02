// require('dotenv').config()
// const express = require("express");
// const cors = require('cors')
// const Router = require('./routes/routes')
// require('./config/database')
// const app = express()
// const multer = require("multer");
// const path = require("path");
// app.use("/images", express.static(path.join(__dirname, "./frontend/src/images")));

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "./frontend/src/images");
//     },
//     filename: (req, file, cb) => {
//       cb(null, req.body.name);
//     },
//   });

//   const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.use(cors())
// app.use(express.json())
// app.set('port', process.env.PORT || 4000)

// app.use('/api', Router)


// app.listen(app.get('port'), () => {
//   console.log('server is listening on port ', app.get('port'))
// })

require('dotenv').config();
const express = require("express");
const cors = require("cors");
const Router = require('./routes/routes');
const app = express();
const passport = require('passport');
require('./config/database');

const path = require("path");
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/api', Router);


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(process.env.PORT || "4000", process.env.HOST || '0.0.0.0', () => {
    console.log(`El server esta en el puerto ${process.env.PORT || "4000"}`);
  });