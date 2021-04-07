require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.DB}://${process.env.HOST}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => console.error(`Could not connect to MongoDB...`, err));

module.exports = mongoose;
