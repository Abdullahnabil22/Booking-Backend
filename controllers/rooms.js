const RoomType = require("../models/roomTypes");

// CREATE
exports.createRoomType = async (req, res) => {
  try {
    const roomType = new RoomType(req.body);
    await roomType.save();
    res.status(201).send(roomType);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.createRoomTypeByHotelId = async (req, res) => {
  try {
    const roomType = new RoomType({ ...req.body, hotelId: req.params.id });
    await roomType.save();
    res.status(201).send(roomType);
  } catch (error) {
    res.status(400).send(error);
  }
};

// GET ALL
exports.getRoomTypes = async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    res.status(200).json(roomTypes);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET BY ID
exports.getRoomTypeById = async (req, res) => {
  try {
    const roomType = await RoomType.findById(req.params.id);
    if (!roomType) {
      return res.status(404).json({ message: "Room type not found" });
    }
    res.status(200).json(roomType);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET BY host ID
exports.getRoomTypeByHostId = async (req, res) => {
  try {
    const roomType = await RoomType.find({ host_id: req.params.id });
    res.status(200).json(roomType);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET BY apartment ID
exports.getRoomTypeByApartmentId = async (req, res) => {
  try {
    const roomType = await RoomType.find({ apartment_id: req.params.id });
    res.status(200).json(roomType);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
exports.updateRoomType = async (req, res) => {
  try {
    const updatedRoomType = await RoomType.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoomType);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
exports.deleteRoomType = async (req, res) => {
  try {
    await RoomType.findByIdAndDelete(req.params.id);
    res.status(200).json("Room type has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
