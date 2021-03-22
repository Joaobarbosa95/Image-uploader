const express = require("express");
const path = require("path");
const upload = require("./multer");
const fs = require("fs");

const app = express();

const port = process.env.PORT || 7000;
const staticFiles = path.join(__dirname, "./public");

app.use(express.static(staticFiles));

app.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.sendStatus(401);
  } else {
    res.status(201).send();
  }
});

app.get("/photo-*", (req, res) => {
  try {
    const img = req.originalUrl.slice(7);
    const filePath = __dirname + `\\images\\${img}`;
    console.log(filePath);
    console.log(fs.accessSync(filePath));
    fs.accessSync(filePath);
    res.sendFile(filePath);
  } catch (e) {
    res.send("<h1>Image not found</h1>");
  }
});

app.listen(port, () => console.log("Server running on port %s", port));
