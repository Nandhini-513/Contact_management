const Joi = require("joi");
const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  phone: {
    type: Number,
    required: [true, "phone number is required"],
  },
  designation: {
    type: String, // New field: designation
    required: [true, "designation is required"],
  },
  gender: {
    type: String, // New field: gender
    required: [true, "gender is required"],
  },
  courses: {
    type: [String], // New field: array of courses
    required: [true, "courses are required"],
  },
  image: {
    type: String, // New field: image (URL or file path)
    required: false, // Optional field for image URL or path
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Contact = new mongoose.model("contact", ContactSchema);

const validateContact = (data) => {
  const Schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(7).max(10000000000).required(),
    designation: Joi.string().min(2).max(50).required(), // Validate designation
    gender: Joi.string().valid("male", "female", "other").required(), // Validate gender
    courses: Joi.array().items(Joi.string().min(1).max(50)).required(), // Validate courses array
    image: Joi.string().uri().optional(), // Optional image field (URL or file path)
  });
  return Schema.validate(data);
};

module.exports = {
  validateContact,
  Contact,
};
