const mongoose = require("mongoose");

const Client = mongoose.model("Client", {
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  adress: {
    type: String,
  },
  tel: {
    type: String,
  },
  image: {
    type: String,
  },
  tags: {
    type: Array,
  },
  date: {
    type: Date,
  },
});

module.exports = Client;
