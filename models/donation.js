const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registerusers",
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "creator",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    creatorName: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      default: "₹",
    },
    amount: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("donation", donationSchema);
