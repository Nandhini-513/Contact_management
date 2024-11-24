require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const morgan = require("morgan"); //Library which  track and monitor incoming requests
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const auth = require("./middlewares/auth");
const User = require("./models/user");
const multer = require("multer");
const app = express();
const cors = require('cors');
app.use(cors());

// middleware
// app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
// app.use(require("cors")());

// router
// app.use("/protected", auth, (req, res) => {
//   return res.status(200).json( req.User );
// });
app.use("/api", require("./routers/auth"));
app.use("/api", require("./routers/contact"));

// server configurations
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`server listening on port: ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
