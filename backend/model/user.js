const mongoose = require("mongoose");

const User = mongoose.model("User", {
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  tel: {
    type: Number,
  },
  image: {
    type: String,
  },
  tags: {
    type: Array,
    default : []
  },
  date: {
    type: Date,
  },
  role: {
    type: String,
  },
});

module.exports = User;
