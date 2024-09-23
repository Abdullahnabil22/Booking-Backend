const express = require("express");

const router = express.Router();

const {
  saveHosts,
  getAllhosts,
  deleteHostById,
  patchHostById,
} = require("../controllers/hosts");

const { auth, restrictTo } = require("../middlewares/auth");

router.post("/", auth, restrictTo("investor", "manager"), saveHosts);

router.get("/", auth, restrictTo("investor", "manager", "user"), getAllhosts);

router.delete("/:id", auth, restrictTo("manager"), deleteHostById);

router.patch("/:id", auth, restrictTo("manager"), patchHostById);

module.exports = router;
