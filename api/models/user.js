const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    
  },
  { timestamps: true }
);

const User = model("blog", userSchema);

module.exports = User;
