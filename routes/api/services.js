const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");

// @route   GET /api/services
// @desc    get 10 services from database
// @access  Public
router.get("/api/services", async (req, res) => {
  try {
    // TODO how to select 10 of documents? randomly?
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
