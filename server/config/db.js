const mongoose = require("mongoose");

const connectDB = async () => {
  return mongoose
    .connect("mongodb://127.0.0.1:27017/employee_list")
    .then(() => console.log("connection to database established"))
    .catch((err) => {
      console.log("error occured");
      console.log(err);
    });
};

module.exports = connectDB;
