const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

// Регистрация пользователя
router.post("/registration", async (req, res) => {
  let newUser = new User({
    username: req.body.username
  });

  try {
    await User.register(newUser, req.body.password);
    res.status(200).send(null);
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
});

// Авторизация пользователя
router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log(`${req.user.username} залогинился!`);
  res.send({
    user: {
      id: req.user._id,
      username: req.user.username,
      adventures: req.user.adventures,
      favoriteAdventures: req.user.favoriteAdventures
    }
  });
});

router.post("/logout", (req, res) => {
  req.logout();
  console.log(req.user);
  res.send({
    user: {
      username: "",
      adventures: [],
      favoriteAdventures: []
    }
  });
});

module.exports = router;
