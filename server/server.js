const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
const DATA_PATH = `${path.join(__dirname, "data.json")}`;
app.use(cors());
app.use(bodyParser.json());


// MULTER
const UPLOAD_DIR = './public/photos'
app.use("/photos", express.static(path.join(__dirname, UPLOAD_DIR)));
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null,  fileName);
  },
});
const upload = multer({ dest: UPLOAD_DIR, storage });

// END OF MULTER


app.get("/", (req, res) => {
  fs.readFile(DATA_PATH, function (err, d) {
    if(err) return res.status(401)
    res.send(d);

  })
});


app.post("/addMember", upload.single("photoUpload"),(req, res,next) => {

  console.log(req.file);
  fs.readFile(DATA_PATH, function (err, d) {
    if(err) return res.status(401).send("there is somthing wrong with reading the file")
    var json = JSON.parse(d);
    if (d === null || d === undefined || d=== "") {
      fs.writeFile(DATA_PATH, "[]", (err) => {
        console.log(err);
      });

    }
    json.push(req.body);
    

    fs.writeFile(DATA_PATH, JSON.stringify(json), (err) => {
    if (err)
      return res
        .status(401)
        .send("there is somthing wrong with writing to the file");
      res.status(200).send("success")
    });
  });
 

});



app.listen(3001);
