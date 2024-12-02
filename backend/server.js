const express = require("express");
const app = express();
const cors = require("cors");
require("./config/connect");
require("dotenv").config();

const boardRoute = require("./routes/board");
const clientRoute = require("./routes/client");
const userRoute = require("./routes/user");
const projectRoute = require("./routes/project");
const { createAdminAccount } = require("./controllers/user");

app.use(express.json());
app.use("/board", boardRoute);
app.use("/client", clientRoute);
app.use("/user", userRoute);
app.use("/project", projectRoute);

app.use("/files", express.static("./uploads"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  createAdminAccount();
});
