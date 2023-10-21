var express = require("express");
const multer = require("multer");
var cors = require("cors");
require("dotenv").config();

var app = express();
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Set up the storage for uploaded files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  const file = req.file;
  if (!file) return res.json({ error: "No file uploaded" });
  const response = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  };
  res.json(response);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
