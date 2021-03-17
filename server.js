const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "public/images/" });

const port = process.env.PORT || 7000;
const staticFiles = path.join(__dirname, "./public");

app.use(express.static(staticFiles));

//
app.get("/", (req, res) => {
  res.send("Server working fine!");
});

app.listen(port, () => console.log("Server running on port %s", port));
