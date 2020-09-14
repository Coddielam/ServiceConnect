const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Users = require("../../models/Users");

// @route   /api/profile/me
// @desc    get current user profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.userID).select("-password");
    if (!user) return res.status(400).json({ msg: "Could not find user" });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Server error");
  }
});
