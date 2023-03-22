const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// Connect to the database
mongoose
  .connect("mongodb://127.0.0.1:27017/food-ordering", {
    useNewUrlParser: true,
  })
  .catch((err) => {
    console.log("Connection Error: ", err.message);
  });

const db = mongoose.connection;

module.exports = db;
