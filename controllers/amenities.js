const Amenities = require("../models/amenities");

let getAllAmenities = async (req, res) => {
  try {
    const amenities = await Amenities.find();
    res.status(200).json(amenities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let getAmenityById = async (req, res) => {
  try {
    const amenity = await Amenities.findById(req.params.id);
    if (amenity == null) {
      return res.status(404).json({ message: "Cannot find amenity" });
    }
    res.status(200).json(amenity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let createAmenity = async (req, res) => {
  try {
    const amenity = new Amenities(req.body);
    const newAmenity = await amenity.save();
    res.status(201).json(newAmenity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let getAmenityByHotelId = async (req, res) => {
  try {
    const amenities = await Amenities.find({ hotelId: req.params.id });
    res.status(200).json(amenities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let createAmenityByHotelId = async (req, res) => {
  try {
    let hotelId = req.params.id;
    let newAmenity = req.body;
    const amenity = await Amenities.create({ ...newAmenity, hotelId });
    res.status(201).json(amenity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let updateAmenity = async (req, res) => {
  try {
    const amenity = await Amenities.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (amenity == null) {
      return res.status(404).json({ message: "Cannot find amenity" });
    }
    res.status(200).json(amenity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let deleteAmenity = async (req, res) => {
  try {
    const amenity = await Amenities.findByIdAndDelete(req.params.id);
    if (amenity == null) {
      return res.status(404).json({ message: "Cannot find amenity" });
    }
    res.status(200).json({ message: "Amenity deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity,
  createAmenityByHotelId,
  getAmenityByHotelId,
};
