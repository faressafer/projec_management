const mongoose = require("mongoose");

const Projet = mongoose.model("Projet", {
  name: {
    type: String,
  },
  Description: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  files: {
    type: String,
    default: [],
  },
  date: {
    type: Date,
  },
  budget: {
    type: Number,
  },
  client: {
    type: mongoose.Types.ObjectId,
    ref: "Client",
  },
  status: {
    type: String,
  },
  Team: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
});

module.exports = Projet;
