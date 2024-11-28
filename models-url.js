const mongoose = require("mongoose");
const { type } = require("os");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },

    redirectUrl: {
      type: String,
    },

    visitHistory: [{ timestamp: { type: Number } }],
    default: [],
  },
  { timestamp: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
