const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Adventure = require("../models/Adventure");

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

    Adventure.create(newAdventure, (err, newlyAdventure) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        console.log(`Элемент добавлен!\n${newlyAdventure}`);
        res.end();
      }
    })
  } else {
    res.status(401).end();
  }
});

module.exports = router;
