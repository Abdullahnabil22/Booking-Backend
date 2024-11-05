const express = require("express");
const router = express.Router();
const Visitor = require("../models/visitors");

router.post("/analytics", async (req, res) => {
  try {
    const { device, path } = req.body;
    await Visitor.create({ device, path });
    console.log("Visitor created:", req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get analytics data
router.get("/analytics", async (req, res) => {
  try {
    const visitors = await Visitor.find({}).sort({ timestamp: -1 }).limit(1000);

    const deviceStats = await Visitor.aggregate([
      {
        $group: {
          _id: "$device",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({ visitors, deviceStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
