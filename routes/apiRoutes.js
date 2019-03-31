// Imports:
const express = require("express"),
  router = express.Router(),
  { userControllers, questControllers } = require("../controllers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/User.js");

/************************************************************************
 * Routes have the following syntax:
 * router.method('/path/', apiController.methodName)
 *
 * Our server file prepends /api/ to all API routes, so a router to /path/
 * in apiRoutes.js will be served at /api/path/.
 ************************************************************************/

//  router.get('users', apiController.getAllUsers);
router.route("/users").get(userControllers.getAllUsers);

router.post("/users/login", (req, res) => {
  // console.log("hello");
  // console.log(req.body);
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          "cats got your tongue",
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.route("/users/register").post((req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

router.route("/quest/user").post(questControllers.saveQuest);

router.route("/quest/user/:id").get(questControllers.getQuest);

router.route("/quests/:id/:user").put(questControllers.updateQuest);

// router
//   .route("/quests/:userid/head")
//   .get(questControllers.getQuestHead)
//   .post(questControllers.createQuestHead);

// router.route("/quests/:userid/child").post(questControllers.createQuestChild);

// router.route("/quests/:userid/full").get(questControllers.getFullQuest);

// Exports:
module.exports = router;
