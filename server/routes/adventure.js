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
      author: {
        id: req.user._id,
        username: req.user.username
      }
    });

    try {
      let newlyAdventure = await Adventure.create(newAdventure);

      io.emit('newAdventure', newlyAdventure);
    } catch (err) {
      console.log(err);
      res.end();
    }
  } else {
    res.status(401).end();
  }
});

module.exports = router;
