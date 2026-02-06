const mongoose = require("mongoose");

const urlschema = new mongoose.Schema(
  {
    ShortURL: {
      type: String,
      required: true,
      unique: true,
    },
    redirecturl: {
      type: String,
      required: true,
    },
    visithistory: [{ timestamps: Number }],
  },
  { timestamps: true },
);

const URL = mongoose.model("urlshortener", urlschema);

module.exports = URL;
