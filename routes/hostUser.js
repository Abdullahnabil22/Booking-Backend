const express = require("express");

const router = express.Router();

const {
  saveAlluserhost,
  getAlluserhost,
  deleteuserHostById,
  patchuserHostById,
  login,
} = require("../controllers/hostUser");

const { auth } = require("../middlewares/auth");

router.post("/", saveAlluserhost);

router.get("/", getAlluserhost);

router.delete("/:id", deleteuserHostById);

router.patch("/:id", patchuserHostById);

router.post("/login", login);
module.exports = router;
