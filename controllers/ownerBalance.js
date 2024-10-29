const express = require("express");
const OwnerBalance = require("../models/ownerBalance");
const router = express.Router();

router.get("/", async (req, res) => {
  const ownerBalance = await OwnerBalance.find({});
  res.json(ownerBalance);
});

router.get("/:owner_id", async (req, res) => {
  try {
    const ownerBalance = await OwnerBalance.findOne({
      owner_id: req.params.owner_id,
    });
    if (!ownerBalance) {
      return res.status(404).json({ message: "Owner balance not found" });
    }
    res.json(ownerBalance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { current_balance, total_paid } = req.body;

    const updatedBalance = await OwnerBalance.findOneAndUpdate(
      { owner_id: id },
      {
        current_balance,
        $inc: { total_paid: total_paid },
      },
      { new: true }
    );

    res.json(updatedBalance);
  } catch (error) {
    res.status(500).json({ message: "Error updating owner balance" });
  }
});

module.exports = router;
