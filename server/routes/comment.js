const express = require("express");
const router = express.Router();
const Adventure = require("../models/Adventure");
const Comment = require("../models/Comment");
const { io } = require("../app");

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
      io.emit('newComment', {
        id: req.body.id,
        comment: newlyComment
      })
      console.log(`Коммент создан на запись с id - ${req.body.id}\n${comment}`);
      res.end();
    } catch (err) {
      console.log(err);
      res.end();
    }
  } else {
    res.sendStatus(401).end();
  }
});

module.exports = router;
