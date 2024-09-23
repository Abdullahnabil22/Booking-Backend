const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      unique: [true, "user name must be unique"],
      minLength: 3,
      maxLength: 16,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["investor", "manager"],
      default: "manager",
    },
  },
  { collection: "hostUser" }
);

userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

module.exports = mongoose.model("hostUser", userSchema);
