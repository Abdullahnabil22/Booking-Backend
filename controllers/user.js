const express = require("express");
let userModell = require("../models/user");
// let {user}= require('../modele/user')
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail =require("../utils/user");
const crypto = require('crypto');
const JWT_SECRET = process.env.SECRET 


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

let postUser = async (req, res) => {
  var newdata = req.body; // Get the data from the request body
  console.log(newdata);

  try {
  
    let user = await userModell.create(newdata);
    console.log("User created:", user);

    var token = jwt.sign(
      {
        email: user.email, 
        id: user._id,
        role: user.role, 
       
        username: user.userName, 
      },
      process.env.SECRET,
    );

    res.status(201).send({ token });

  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: err.message });
  }
};

 login= async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log("password",password);
  

  if (!email ) {
    return res.json("please enter email and password");
  } else {
    var loginuserName = await userModell.findOne({ email: email });
    if (!loginuserName) {
      return res.json("please enter valid email or password");
    }

    let passwordvaliad = await bcryptjs.compare(
      password,
      loginuserName.password
    );
    console.log
    
    if (!passwordvaliad) {
      console.log("passwordvaliad",passwordvaliad)
      return res.json("please enter valid or password");
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
  res.send(token);
};
//////////////// update user
const UpdateData = async (req, res) => {
  console.log("Request body:", req.body);
  
  const update = req.body.updatedData; 

  let user = await userModell.findById(req.params.id);
  if (!user) {
    return res.status(404).json("User not found");
  }

  user.userName = update.userName !== undefined ? update.userName : user.userName; 
  user.firstName = update.firstName !== undefined ? update.firstName : user.firstName;
  user.lastName = update.lastName !== undefined ? update.lastName : user.lastName; 
  user.email = update.email !== undefined ? update.email : user.email;
  user.phoneNumber = update.phoneNumber !== undefined ? update.phoneNumber : user.phoneNumber;
 
  user.nationality = update.nationality !== undefined ? update.nationality : user.nationality;
 
  try {
    await user.save();
    console.log("user updated", user); 
    return res.status(200).json("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json("Error updating user");
  }
};

// Define the function first
const checkemail = async (req, res) => {
  var email = req.body.email;
  if (!email) {
    return res.json("please enter email");
  } else {
    var loginuserName = await userModell.findOne({ email: email });
    if (!loginuserName) {
      return res.json("please enter valid email");
    } else {
      return res.json("Done");
    }
  }
};


 updatePassword = async (req, res) => {
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
    return res.status(404).json({ message: "User not found" });
  }
  user.password = newPassword;
  await user.save();
  res.send("password updated successfully");
};





//////////////// forgetPassword
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  
  const user = await userModell.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  const resetToken = user.createResetPasswordToken();
  await user.save();
  
  const resetUrl = `http://localhost:3001/Register/${resetToken}`;  // Frontend link
  console.log("resetToken",resetToken)

  const message = `
    <p>We have received a password reset request. Please click the button below to reset your password. The link will be valid for only 15 minutes:</p>
    <a href="${resetUrl}" style="display:inline-block; padding:10px 15px; color:white; background-color:#007bff; border-radius:5px; text-decoration:none;">Reset Password</a>
    <p>If the button doesn't work, copy and paste the link below into your browser:</p>
    <p><a href="${resetUrl}">${resetUrl}</a></p>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      html: message,
    });
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    // Clear the reset token and expiration time if email sending fails
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    
    console.error("Email sending error:", err);
    return res.status(500).json({ message: "There was an error sending the email. Try again later." });
  }
};

const resetPassword = async (req, res) => {
  console.log("resetPassword");
  console.log(req.params.token);

  try {
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
    console.log("Token:", token);

    const user = await userModell.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    console.log("User:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    user.password = password; 
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save(); 
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "An error occurred while resetting the password" });
  }
};
////////////////////////////////login-with-token

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};


const loginWithToken = async (req, res) => {
  const { token } = req.body;
  console.log("Received token:", token); 

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    const decoded = await verifyToken(token);
    console.log("Decoded token:", decoded);
    res.status(200).json({ message: 'Login successful', user: decoded });
  } catch (error) {
    console.error("Token verification failed:", error)
    res.status(401).json({ message: 'Invalid token', error: error.message })
  }
};



module.exports = {
  postUser,
  updatePassword,
  login,
  getAllUser,
  getuserById,
  forgotPassword,
  resetPassword,
  checkemail,
  loginWithToken,
  UpdateData
};
