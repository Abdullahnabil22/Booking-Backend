const express = require("express");
const router = express.Router();
let {
  AllUserMessage,
  AllHostMessage,
  sendMessage,
  messageStatus,
  deleteMessage,
} = require("../controllers/message");

// Route to get all messages for a specific user
router.get("/user/:userId", AllUserMessage);

// Route to get all messages for a specific host
router.get("/host/:hostId", AllHostMessage);

// Route to send a message
router.post("/", sendMessage);

// Route to update message status
router.patch("/:id", messageStatus);

// Route to delete a message
router.delete("/:id", deleteMessage);

module.exports = router;
