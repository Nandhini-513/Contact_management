const { validateContact, Contact } = require("../models/contact");
const auth = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();

// // Setup for multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "./public/images"); // The directory where the file will be saved
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`); // Unique filename based on timestamp and file extension
//   },
// });

// // Initialize multer
// const upload = multer({ storage });

// //Upload image

// router.post("/upload", auth, upload.single("image"), async (req, res) => {
//   if (req.file) {
//     res.status(200).json({ message: 'File uploaded successfully' });
//   } else {
//     res.status(400).json({ message: 'No file uploaded' });
//   }

// });

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // Unique filename
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Only .jpeg and .png formats are allowed"), false);
    } else {
      cb(null, true);
    }
  },
});

// create contact
router.post("/contact", auth, upload.single("image"), async (req, res) => {
  try {
    const { error } = validateContact(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, phone, designation, gender, courses } = req.body;
    const image = req.file ? `/public/images/${req.file.filename}` : null;

    const newContact = new Contact({
      name,
      email,
      phone,
      designation,
      gender,
      courses: JSON.parse(courses), // Parse courses if sent as JSON
      image,
      postedBy: req.user._id,
    });

    const result = await newContact.save();
    res.status(201).json({ message: "Contact created successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create contact" });
  }
});

//fetch contact

router.get("/mycontacts", auth, async (req, res) => {
  try {
    const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );
    console.log("contact fetched", myContacts);
    return res.status(200).json({ contacts: myContacts.reverse() });
  } catch (err) {
    console.log(err);
    console.log("No data found");
  }
});

//update contact
router.put("/contact", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "no id is specified" });
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter valid id" });

  try {
    const contact = await Contact.findOne({ _id: id });
    if (req.user._id.toString() !== contact.postedBy._id.toString())
      return res.status(401).json({ error: "cant edit other people contact" });

    const updataData = { ...req.body, id: undefined };
    const result = await Contact.findByIdAndUpdate(id, updataData, {
      new: true,
    });

    return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

//delete contact

router.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });
  try {
    const contact = await Contact.findOne({ _id: id });
    if (!contact) return res.status(400).json({ error: "no contact found" });
    if (req.user._id.toString() !== contact.postedBy._id.toString())
      return res
        .status(401)
        .json({ error: "you can't delete other people contacts!" });
    const result = await Contact.deleteOne({ _id: id });

    const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res
      .status(200)
      .json({ ...contact._doc, myContacts: myContacts.reverse() });
  } catch (err) {
    console.log(error);
  }
});

// to get a single contact

router.get("/contact/:id", auth, async (req, res) => {
  const { id } = req.params;

  console.log(id + "in contact server");
  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  try {
    const contact = await Contact.findOne({ _id: id });
    return res.status(200).json({ ...contact._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
