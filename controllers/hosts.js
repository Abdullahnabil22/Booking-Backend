const hostlistModel = require("../models/hosts");

let saveHosts = async (req, res) => {
  var newHost = req.body;
  newHost.id = req.id;
  try {
    const savehost = await hostlistModel.create(newHost);
    res.status(201).json({ massage: "successss", data: savehost });
  } catch (err) {
    res.status(400).json({ massage: err.message });
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
    const host = await hostlistModel.findOne({ ownerId: req.params.id });
    if (host == null) {
      return res.status(404).json({ message: "Cannot find host" });
    }
    res.status(200).json(host);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let deleteHostById = async (req, res) => {
  let { id } = req.params;

  let gethost = await hostlistModel.findByIdAndDelete(id);

  try {
    if (gethost) {
      res
        .status(200)
        .json({ massage: `Document with ID ${id} has been deleted` });
    } else {
      res.status(404).json({ massage: err.message });
    }
  } catch {
    res.status(404).json({ massage: err.message });
  }
};

let patchHostById = async (req, res) => {
  let newhost = req.body;
  let { id } = req.params;
  try {
    let gethost = await hostlistModel.findByIdAndUpdate(id, { $set: newtodo });

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

module.exports = {
  saveHosts,
  getAllhosts,
  deleteHostById,
  patchHostById,
  getHostById,
  getHostByOwnerId,
};
