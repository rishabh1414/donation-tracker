const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("creator", creatorSchema);
