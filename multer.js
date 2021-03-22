const multer = require("multer");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname + "./images");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    let success;
    try {
      fs.accessSync(path.join(__dirname + `/images/${file.originalname}`));
      success = true;
    } catch (e) {
      success = false;
    }

    console.log(success);
    if (!file.mimetype.includes("image") || success) {
      cb(false);
    } else {
      cb(null, true);
    }
  },
});
