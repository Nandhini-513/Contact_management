const router = require("express").Router();
const User = require("../models/user"); // for Schema structure
const bcrypt = require("bcrypt"); //password encryption
const jwt = require("jsonwebtoken");
const { Schema } = require("mongoose");

const auth = require("../middlewares/auth");

router.post("/login");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // check all the missing fields

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: `please enter all the required field` });
  }

  //   name Validation
  if (name.length > 25)
    return res
      .status(400)
      .json({ error: `Name can only be less than 25characters` });
  //   Email validation
  const emailReg =
    /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;

  if (!emailReg.test(email))
    return res.status(400).json({ error: `provide valid email address` });

  // password validation
  if (password.length < 6)
    return res.status(400).json({ error: `password must atleast 6` });

  try {
    const doesUserAlreadyExist = await User.findOne({ email });
    if (doesUserAlreadyExist)
      return res
        .status(404)
        .json({ error: `User Already Exist Try with another Email` });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });

    // save the user
    const result = await newUser.save();
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "please enter all the required fielsd" });
  }
  const emailReg =
    /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;

  if (!emailReg.test(email))
    return res.status(400).json({ error: `provide valid email address` });

  try {
    const doesUserAlreadyExist = await User.findOne({ email });
    if (!doesUserAlreadyExist)
      return res.status(400).json({ error: "Invalid email or password" });

    // If there any user present check password
    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserAlreadyExist.password
    );

    if (!doesPasswordMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const payload = { _id: doesUserAlreadyExist._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(process.env.JWT_SECRET);

    const user = { ...doesUserAlreadyExist._doc, password: undefined };

    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});

router.get("/me",auth, async (req, res) => {
  return res.status(200).json({ ...req.user });
});

module.exports = router;
