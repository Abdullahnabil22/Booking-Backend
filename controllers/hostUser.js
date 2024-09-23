const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const userHostlistModel = require("../models/hostUser");

saveAlluserhost = async (req, res) => {
  var newuserhost = req.body;
  newuserhost.id = req.id;
  try {
    const saveduserhost = await userHostlistModel.create(newuserhost);
    res.status(201).json({ massage: "success", data: saveduserhost });
  } catch (err) {
    res.status(400).json({ massage: err.message });
  }
};

getAlluserhost = async (req, res) => {
  try {
    let userhost = await userHostlistModel.find();
    res.json(userhost);
  } catch (err) {
    res.status(400).json({ massage: err.message });
  }
};

deleteuserHostById = async (req, res) => {
  let { id } = req.params;

  let getuserhost = await userHostlistModel.findByIdAndDelete(id);

  try {
    if (getuserhost) {
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

patchuserHostById = async (req, res) => {
  let newuserhost = req.body;
  let { id } = req.params;
  try {
    let getuserhost = await userHostlistModel.findByIdAndUpdate(id, {
      $set: newuserhost,
    });

    if (getuserhost) {
      res.status(200).json({
        massage: `Document with ID ${id} has been updated`,
        data: newuserhost,
      });
    } else {
      res.status(404).json({ massage: err.message });
    }
  } catch {
    res.status(404).json({ massage: err.message });
  }
};

login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ massage: "please enter password and email " });
  }

  let uuserhost = await userHostlistModel.findOne({ email: email });

  if (!uuserhost) {
    return res.status(401).json({ massage: "invalid password or email " });
  }
  isvalid = await bcrypt.compare(password, uuserhost.password);

  if (!isvalid) {
    return res.status(401).json({ massage: "invalid password or email " });
  }

  let token = jwt.sign(
    { id: uuserhost._id, email: uuserhost.email, role: uuserhost.role },
    process.env.SECRET
  );
  res.status(200).json({ token: token });
};

module.exports = {
  saveAlluserhost,
  getAlluserhost,
  deleteuserHostById,
  patchuserHostById,
  login,
};

// module.exports={saveAlluserhost,getAlluserhost,deleteuserHostById,patchuserHostById}
