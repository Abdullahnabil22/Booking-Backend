// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//           user: process.env.Email_User,
//           pass: process.env.Email_Password,
//         },

//     });
//

//     const emailOptions = {
//       from: 'Booking Support<rababalaa176199@gmail.com>',
//       to: options.email,
//       subject: options.subject,
//       html: options.html,
//     };

//     await transporter.sendMail(emailOptions);
//   };

const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Email_User,
      pass: process.env.Email_Password,
    },
  });

  const emailOptions = {
    from: "Booking Support <abdullahn.work22@gmail.com>",
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(emailOptions); // Corrected method name here
};

module.exports = sendEmail;
