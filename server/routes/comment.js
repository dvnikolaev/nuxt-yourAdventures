const express = require("express");
const router = express.Router();
const Adventure = require("../models/Adventure");
const Comment = require("../models/Comment");

router.post("/comment", async (req, res) => {
  if (req.user) {
    try {
      let adventure = await Adventure.findById(req.body.id);
      const comment = new Comment({
        text: req.body.message,
        author: {
          id: req.user._id,
          username: req.user.username
        }
      });
      newlyComment = await Comment.create(comment);
      adventure.comments.push(newlyComment);
      adventure.save();
      console.log(`Коммент создан на запись с id - ${req.body.id}\n${comment}`);
    } catch (err) {
      console.log(err);
      res.end();
    }
  } else {
    res.sendStatus(401).end();
  }
});

module.exports = router;
