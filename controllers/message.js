const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const Host = require("../models/hosts");
const Apartment = require("../models/apartments");

router.get("/:ownerId", async (req, res) => {
  try {
    const { ownerId } = req.params;
    if (!ownerId) {
      return res.status(400).json({ message: "Owner ID is required" });
    }

    const messages = await Message.find({
      $or: [{ sender: ownerId }, { receiver: ownerId }],
    });

    console.log("Before populate:", messages);

    const populatedMessages = await Message.populate(messages, [
      { path: "sender" },
      { path: "receiver" },
      {
        path: "hostId",
        model: "Host",
        strictPopulate: false,
      },
      { path: "apartmentId" },
    ]);

    console.log("After populate:", populatedMessages);

    const hostIds = messages.map((message) => message.hostId);
    const hosts = await Host.find({ _id: { $in: hostIds } });
    const apartmentIds = messages.map((message) => message.apartmentId);
    const apartments = await Apartment.find({ _id: { $in: apartmentIds } });
    console.log("Found hosts:", hosts);
    console.log("Found apartments:", apartments);

    res.json(populatedMessages);
  } catch (error) {
    console.error("Error in GET /messages/:ownerId:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, apartmentId, hostId, content } = req.body;

    if (!senderId || !receiverId || (!hostId && !apartmentId) || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      apartmentId,
      hostId,
      content,
    });

    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in POST /messages:", error);
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id/read", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.read = true;
    await message.save();
    res.json(message);
  } catch (error) {
    console.error("Error in PATCH /messages/:id/read:", error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
