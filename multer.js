const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "\\images");
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
      fs.accessSync(__dirname + `\\images\\${file.originalname}`);
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
