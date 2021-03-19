const express = require("express");
const path = require("path");
const upload = require("./multer");
const fs = require("fs");

const app = express();

const port = process.env.PORT || 7000;
const staticFiles = path.join(__dirname, "./public");

app.use(express.static(staticFiles));

app.post("/", upload.single("image"), (req, res) => {
  console.log("Upload Sucessful");
});

app.listen(port, () => console.log("Server running on port %s", port));
