const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Adventure = require("../models/Adventure");
const { io } = require("../app");

router.post("/adventure", async (req, res) => {
  if (req.user) {
    const newAdventure = new Adventure({
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      countLike: 0,
      author: {
        id: req.user._id,
        username: req.user.username
      }
    });

    try {
      let newlyAdventure = await Adventure.create(newAdventure);

      io.emit('newAdventure', newlyAdventure);
      res.end();
    } catch (err) {
      console.log(err);
      res.end();
    }
  } else {
    res.status(401).end();
  }
});

router.post("/likeAdventure", async (req, res) => {
  if (req.user) {
    try {
      let adventure = await Adventure.findById(req.body.adventureID);
      let user = await User.findById(req.user._id);
      let indexAdventure = await user.favoriteAdventures.findIndex(item => item == req.body.adventureID);

      if (indexAdventure > -1) {
        user.favoriteAdventures.splice(indexAdventure, 1);
        user.save();
        adventure.countLike--;
        adventure.save();
      } else {
        user.favoriteAdventures.push(req.body.adventureID);
        user.save();
        adventure.countLike++;
        adventure.save();
      }
      res.end();
    } catch(err) {
      console.log(err);
      res.end();
    }
  } else {
    res.status(401).end();
  }
});

module.exports = router;
