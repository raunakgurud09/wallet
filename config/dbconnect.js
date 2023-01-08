const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = () => {
  const url = process.env.MONGO_URI;

  return mongoose
    .connect(url, {})
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectDB();
