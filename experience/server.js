const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "\\images");
  },
  filename: function (req, file, cb) {
    console.log(req);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const port = process.env.PORT || 1000;
// const staticFiles = path.join(__dirname, "./public");

app.use(express.static(__dirname));

//

app.post("/*", upload.single("image"), function (req, res, next) {
  //
});

app.listen(port, () => console.log("Server running on port %s", port));
