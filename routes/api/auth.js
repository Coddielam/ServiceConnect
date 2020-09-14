const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Users = require("../../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route    POST /api/auth
// @desc     Login
// @access   Private
router.post(
  "/",
  [
    check("email", "Invalid email address").isEmail(),
    check("password", "Password cannot be empty").not().isEmpty(),
  ],
  async (req, res) => {
    // 1. Handle validation errors collected in request sent
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 2. Check db to see if user login info is valid
    // -- check email and password
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credential" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credential" }] });
      }

      // 3. return user id in JWT string if credential correct
      const payload = {
        userID: user.id,
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "7d" },
        (err, hash) => {
          if (err) console.error(err.message);
          res.json(hash);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
