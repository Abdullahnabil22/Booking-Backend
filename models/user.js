const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

let userModel = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,

      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    nationality: {
      type: String,
      required: true,
    },
    members: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

userModel.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hashSync(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

module.exports = mongoose.model("User", userModel);
