const express = require("express");
let userModell = require("../models/user");
// let {user}= require('../modele/user')
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

getAllUser = async (req, res) => {
  try {
    let user = await userModell.find();
    res.json(user);
  } catch (err) {
    res.status(400).json({ massage: err.message });
  }
};
getuserById = async (req, res) => {
  try {
    let user = await userModell.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ massage: err.message });
  }
};
/////////////////////////// register 

let postUser = async (req, res) => {
  var newdata = req.body;
  var email= req.body.email
  loginuserName = await userModell.findOne({ email: email });
  if (loginuserName){
    return res.status(302).json({ 
      message: "User already exists", 
      redirect: "/login" 
    });

  }
  else{
    try {
      let user = await userModell.create(newdata);
  
      console.log(user);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }

  }
 
};



//////////////////////// sign in 
let login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  if (!email || !password) {
    return res.json("please enter email and password");
  } else {
    var loginuserName = await userModell.findOne({ email: email });
    if (!loginuserName) {
      return res.status(404).json("please enter valid email or password");
    }

    let passwordvaliad = await bcryptjs.compare(
      password,
      loginuserName.password
    );
    if (!passwordvaliad) {
      return res.status(404).json("please enter valid email or password");
    }
  }
  console.log(process.env.SECRET);
  var token = jwt.sign(
    {
      email: loginuserName.email,
      id: loginuserName._id,
      role: loginuserName.role,
      username: loginuserName.userName,
    },
    process.env.SECRET
  );
  res.status(200).send(token);
};

let updatePassword = async (req, res) => {
  var { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.send("invalid currentPassword or newPassword");
  }
  let user = await userModell.findById(req.id);
  var passwordvaliad = await bcryptjs.compare(currentPassword, user.password);

  if (!passwordvaliad) {
    return res.send("invalid currentPasswordd or newPasswordd");
  }
  var updateuserr = await userModell.findOneAndUpdate(
    { _id: req.id },
    newPassword
  );
  if (!updateuserr) {
    // Check if update was successful
    return res.status(404).json({ message: "User not found" });
  }
  user.password = newPassword;
  await user.save();
  res.send("password updated successfully");
};

module.exports = {
  postUser,
  updatePassword,
  login,
  getAllUser,
  getuserById,
};
