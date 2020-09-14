const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  date: { type: Date, default: Date.now },
  location: { city: String, state: String, country: String },
  services: [
    {
      service: String,
      avgRating: Number,
      numRatings: Number,
      numCustomers: Number,
    },
  ],
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: String,
      from: { type: Date, required: true },
      to: Date,
      current: { type: Boolean, default: false },
      description: String,
    },
  ],
  educations: [
    {
      institution: { type: String, required: true },
      location: { String },
      degree: { type: String, required: true },
      fieldOfStudy: { type: String, required: true },
      from: { type: Date, required: true },
      to: { Date },
      current: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Users", UserSchema);
