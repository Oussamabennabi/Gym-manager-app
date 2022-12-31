const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();

const DATA_PATH = `${path.join(__dirname, "data.json")}`;
const UPLOAD_DIR = "./public/photos";

app.use(cors());
app.use(bodyParser.json());

const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

// MULTER
app.use("/photos", express.static(path.join(__dirname, UPLOAD_DIR)));
const multer = require("multer");

async function deleteOldPhoto(originalname) {
  const { json } = readFromFile();

  const member = json.find(
    (member) => member.id === originalname.split(".")[0]
  );
  if (!member) {
    return;
  }

  const oldFileName = member.photo;

  const deleteFileError = await deleteFile(oldFileName);
  if (deleteFileError) {
    console.log(deleteFileError);
  }
}

async function deleteFile(fileName) {
  let error = null;
  if (fileName === "avatar.svg") return;
  const relativePath = path.join(__dirname, UPLOAD_DIR, fileName);

  if (fs.existsSync(relativePath)) {
    await unlinkAsync(relativePath)
      .then((_) => console.log("file was deleted with", relativePath))
      .catch((err) => (error = err));
  }
  return error;
}

function readFromFile() {
  const json = fs.readFileSync(DATA_PATH, "utf-8");
  return { json: JSON.parse(json) };
}

function writeToFile(data) {
  const json = JSON.stringify(data);
  fs.writeFileSync(DATA_PATH, json, "utf-8");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: async (req, file, cb) => {
    await deleteOldPhoto(file.originalname);

    const fileName = file.originalname;
    cb(null, fileName);
  },
});
const upload = multer({ dest: UPLOAD_DIR, storage });
// END OF MULTER

// get all members
app.get("/members", (req, res) => {
  const { json } = readFromFile();
  res.send(JSON.stringify(json));
});

// get one member
app.get("/members/get/member/:id", (req, res) => {
  const { json } = readFromFile();
  const member = json.find((member) => member.id === req.params.id);
  if (!member) {
    res.status(404).send("there is no member with id " + req.params.id);
  }
  res.status(200).send(member);
});

// add member
app.post("/members/add", upload.single("photoUpload"), (req, res, next) => {
  const { json } = readFromFile();
  const memberExists = json.find((member) => member?.id === req.body.id);

  if (memberExists || memberExists != null) {
    res.status(500).send("member is already added");
  } else {
    json.push(req.body);
  }
  writeToFile(json);

  res.status(200).send("member added successfully");
});

// update member
app.put(
  "/members/update/member/:id",
  upload.single("photoUpload"),
  (req, res, next) => {
    const { json } = readFromFile();
    const newJson = [
      ...json.filter((member) => member.id !== req.params.id),
      req.body,
    ];

    writeToFile(newJson);

    res.status(200).send("member updated successfully");
  }
);

// delete member :
app.delete("/members/delete/member/:id", async (req, res) => {
  const { json } = readFromFile();
  const memberToDelete = json.find((member) => member.id === req.params.id);
  // deleting photo from server

  const deleteFileError = await deleteFile(memberToDelete.photo);
  if (deleteFileError) {
    res.status(500).send(deleteFileError);
  }

  const newJson = json.filter((member) => member.id !== req.params.id);
  writeToFile(newJson);

  res.status(200).send("member updated successfully");
});

app.listen(3001);
