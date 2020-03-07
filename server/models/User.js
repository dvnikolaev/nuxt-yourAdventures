const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  adventures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adventure"
    }
  ],
  favoriteAdventures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adventure"
    }
  ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
