const express = require("express");

const router = express.Router();
const { authUser } = require("../middlewares/auth");

const {
  updatePassword,
  postUser,
  login,
  sendForgetPassordLink,
  getAllUser,
} = require("../controllers/user");
router.post("/", postUser);
router.get("/", getAllUser);

router.post("/login", login);
router.patch("/updatePassword", authUser, updatePassword);
router.post("/sendForgetPassordLink", sendForgetPassordLink);

module.exports = router;
