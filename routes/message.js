const express = require("express");
const router = express.Router();
let {
  AllUserMessage,
  AllHostMessage,
  sendMessage,
  messageStatus,
  deleteMessage,
  AllApartmentMessage,
} = require("../controllers/message");
const { auth, restrictTo } = require("../middlewares/auth");

router.get(
  "/user/:id",
  // auth,
  // restrictTo("admin", "user", "owner"),
  AllUserMessage
);

router.get(
  "/host/:id",
  auth,
  restrictTo("admin", "user", "owner"),
  AllHostMessage
);

router.get(
  "/apartment/:id",
  auth,
  restrictTo("admin", "user", "owner"),
  AllApartmentMessage
);

router.post("/", auth, restrictTo("admin", "user", "owner"), sendMessage);

router.patch("/:id", auth, restrictTo("admin", "user", "owner"), messageStatus);

router.delete(
  "/:id",
  auth,
  restrictTo("admin", "user", "owner"),
  deleteMessage
);

module.exports = router;
