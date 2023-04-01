const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected!!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDatabase;
