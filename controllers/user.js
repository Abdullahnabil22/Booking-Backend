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

let postUser = async (req, res) => {
  var newdata = req.body;
  // console.log(newdata);
  try {
    let user = await userModell.create(newdata);

    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
let login = async (req, res) => {
  var userName = req.body.userName;
  var password = req.body.password;
  if (!userName || !password) {
    return res.json("please enter email and password");
  } else {
    var loginuserName = await userModell.findOne({ userName: userName });
    if (!loginuserName) {
      return res.json("please enter valid email or password");
    }

    let passwordvaliad = await bcryptjs.compare(
      password,
      loginuserName.password
    );
    if (!passwordvaliad) {
      return res.json("please enter valid email or password");
    }
  }
  console.log(process.env.SECRET);
  var token = jwt.sign(
    { userName: loginuserName.userName, id: loginuserName._id },
    process.env.SECRET
  );
  console.log(req.body);
  res.send(token);
};

let updatePassword = async (req, res) => {
  var { currentPassword, newPassword } = req.body;
  console.log(currentPassword);

  if (!currentPassword || !newPassword) {
    return res.send("invalid currentPassword or newPassword");
  }
  let user = await userModell.findById(req.id); ///////////////// همسك id علشان اقدر اجيب من خلاله الباسورد
  console.log(req.id);

  // console.log(currentPassword,newPassword)
  // console.log(user.password)
  var passwordvaliad = await bcryptjs.compare(currentPassword, user.password);
  ///// هقارن بين الياسورد المبعوت و الباسورد اللى عندى

  if (!passwordvaliad) {
    return res.send("invalid currentPasswordd or newPasswordd");
  }
  var updateuserr = await userModell.findOneAndUpdate(
    { _id: req.id },
    newPassword
  );

  user.password = newPassword;
  await user.save();
  res.send("password updated successfully");
};
let sendForgetPassordLink = async (req, res) => {
  console.log(req.body.email);
  //     const user = await user.findeOne({email:req.body.email})
  // if(!user){
  //     return res.satus(404).json(" user not found")
  // }
  // const secret= process.env.SECRET +user.password
  // const token =jwt.sign({email:user.email,id:user.id}, secret,{
  //    expiresIn:'10m'
  //   });
};

module.exports = {
  postUser,
  updatePassword,
  login,
  sendForgetPassordLink,
  getAllUser,
};
