const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  create,
  list,
  deleteClient,
  update,
  byId,
  deleteall,
} = require("../controllers/client");

let fileName = "";
const myStorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    fileName = Date.now() + "." + file.mimetype.split("/")[1];
    redirect(null, fileName);
  },
});

const upload = multer({ storage: myStorage });

router.post("/create", upload.single("image"), (req, res) => {
  create(req, res, fileName);
  fileName = "";
});
router.get("/list", list);
router.get("/byId/:id", byId);
router.delete("/delete/:id", deleteClient);
router.put("/update/:id", upload.single("image"), (req, res) => {
  update(req, res, fileName);
  fileName = "";
});
router.delete("/deleteall", deleteall);

module.exports = router;
