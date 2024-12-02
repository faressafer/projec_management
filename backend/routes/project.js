const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  create,
  list,
  preview,
  deleteProject,
  update,
  byId,
} = require("../controllers/projet");

fileNames = [];

const myStorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    fl = Date.now() + "." + file.mimetype.split("/")[1];
    fileNames.push(fl);
    redirect(null, fl);
  },
});

const upload = multer({ storage: myStorage });

router.post("/create", upload.any("files"), (req, res) => {
  create(req, res, fileNames);
  fileNames = "";
});
router.put("/update/:id", upload.any("files"), (req, res) => {
  update(req, res, fileNames);
  fileNames = "";
});

router.get("/list", list);
router.get("/preview/:id", preview);
router.delete("/delete/:id", deleteProject);
router.get("/byId/:id", byId);
module.exports = router;
