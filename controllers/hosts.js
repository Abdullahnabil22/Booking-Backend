const hostlistModel = require("../models/hosts");

let saveHostsbyOwnerId = async (req, res) => {
  var ownerId = req.params.id;
  var newHost = req.body;
  try {
    const savehost = await hostlistModel.create({ ...newHost, ownerId });
    res.status(201).json({ message: "success", data: savehost });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let getAllhosts = async (req, res) => {
  try {
    let host = await hostlistModel.find();
    res.json(host);
  } catch (err) {
    res.status(400).json({ massage: err.message });
  }
};

let getHostById = async (req, res) => {
  try {
    const host = await hostlistModel.findById(req.params.id);
    if (host == null) {
      return res.status(404).json({ message: "Cannot find host" });
    }
    res.status(200).json(host);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let getHostByOwnerId = async (req, res) => {
  try {
    const host = await hostlistModel.find({ ownerId: req.params.id });
    if (host == null&&host.isDisabled==true) {
      return res.status(404).json({ message: "Cannot find host" });
    }
 
    res.status(200).json(host);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let deleteHostById = async (req, res) => {
  let { id } = req.params;
  try {
    let gethost = await hostlistModel.findByIdAndDelete(id);
    if (gethost) {
      res
        .status(200)
        .json({ message: `Document with ID ${id} has been deleted` });
    } else {
      return res.status(404).json({ message: "Host not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let patchHostById = async (req, res) => {
  let newhost = req.body;
  let { id } = req.params;
  
  try {
    let gethost = await hostlistModel.findByIdAndUpdate(id, { $set: newhost });


    if (gethost) {
      res.status(200).json({
        massage: `Document with ID ${id} has been updated`,
        data: newhost,
      });
    } else {
      res.status(404).json({ massage: err.message });
    }
  } catch {
    res.status(404).json({ massage: err.message });
  }
};
// routes/hotels.js

const disable = async (req, res) => {
  try {
    const hotelId = req.params.id;

    const updatedHotel = await hostlistModel.findByIdAndUpdate(
      hotelId,
      { isDisabled: true },
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.status(200).json({ message: 'Hotel disabled successfully', hotel: updatedHotel });
  } catch (error) {
    console.error('Error disabling hotel:', error.message);
    res.status(500).json({ message: 'An error occurred while disabling the hotel', error: error.message });
  }
}




module.exports = {
  saveHostsbyOwnerId,
  getAllhosts,
  deleteHostById,
  patchHostById,
  getHostById,
  getHostByOwnerId,
  disable
};
