const express = require("express");

const router = express.Router();

const {
  updatePassword,
  postUser,
  login,
  getAllUser,
  getuserById,
  forgotPassword,
  resetPassword,
  checkemail,
  loginWithToken
} = require("../controllers/user");
const { auth, restrictTo } = require("../middlewares/auth");

router.post("/", postUser);
router.get(
  "/",
  // auth, restrictTo("admin"),
  getAllUser
);
router.get(
  "/:id",
  // auth,
  //  restrictTo("admin"),
  getuserById
);

router.post("/login", login);
router.post("/checkemail", checkemail);

router.post("/dashboardLogin", auth, login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch(
  "/updatePassword",
  auth,
  restrictTo("admin", "user", "owner"),
  updatePassword
);
router.post('/loginWithToken', loginWithToken);
module.exports = router;
