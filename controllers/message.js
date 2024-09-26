const Message = require("../models/message");

let AllUserMessage = async (req, res) => {
  try {
    const messages = await Message.find({ user_id: req.params.id });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let AllHostMessage = async (req, res) => {
  try {
    const messages = await Message.find({ host_id: req.params.id });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let AllApartmentMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      apartment_id: req.params.id,
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let sendMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let messageStatus = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: "Cannot find message" });
    }

    if (req.body.status != null) {
      message.status = req.body.status;
    }

    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
let deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Cannot find message" });
    }

    await message.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted message" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  AllUserMessage,
  AllHostMessage,
  sendMessage,
  messageStatus,
  deleteMessage,
  AllApartmentMessage,
};
