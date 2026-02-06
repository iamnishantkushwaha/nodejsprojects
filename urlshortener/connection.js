const mongoose = require("mongoose");

async function connectmongodb(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("mongo connected successfully"));
}

module.exports = { connectmongodb };
