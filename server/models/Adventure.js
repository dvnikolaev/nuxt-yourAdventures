const mongoose = require("mongoose");

const adventureSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  countLike: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
})