const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  SignIn,
  list,
  createUserAccount,
  deleteUser,
  update,
  byId,
} = require("../controllers/user");

let fileName = "";
const myStorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    fileName = Date.now() + "." + file.mimetype.split("/")[1];
    redirect(null, fileName);
  },
});

const upload = multer({ storage: myStorage });

router.post("/createuseraccount", upload.single("image"), (req, res) => {
  createUserAccount(req, res, fileName);
  fileName = "";
});
router.post("/signin", SignIn);
router.get("/list", list);
router.get("/byid/id", list);
router.delete("/delete/:id", deleteUser);

router.put("/update/:id", upload.single("image"), (req, res) => {
  list(req, res, fileName);
  fileName = "";
});

module.exports = router;
