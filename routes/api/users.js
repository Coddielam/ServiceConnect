const express = require("express");
const { check, validationResult } = require("express-validator");
const Users = require("../../models/Users");
const config = require("config");
const jwtSecret = config.get("jwtSecret");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const router = express.Router();

// @route    POST api/users
// @desc     Registering user
// @access   Public
router.post(
  "/",
  [
    check("name", "Name cannot be empty").not().isEmpty(),
    check("email", "Please double-check email format")
      .isEmail()
      .normalizeEmail(),
    check("password", "Password must be longer than 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // handle validation errors collected if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, location } = req.body;

    try {
      // check if email already registered
      let user = await Users.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already registered" }] });
      }
      // create user gravatar
      const avatar = await gravatar.url(email, {
        size: 200,
        rating: "pg",
        default: "retro",
      });

      // create and save user to database
      user = new Users({
        name,
        email,
        password,
        avatar,
        location: location || {},
      });

      const saltRound = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, saltRound);

      await user.save();

      // get user id and return in the form of jwt token
      const payload = {
        user: {
          id: user.id,
        },
      };
      // ** return a json token
      jwt.sign(payload, jwtSecret, (err, token) => {
        if (err) throw err;
        res.json(token);
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
