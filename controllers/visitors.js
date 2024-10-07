const express = require("express");
const Visitor = require("../models/visitors");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const visitors = await Visitor.find({});
    const labels = visitors.map((visitor) => visitor.label);
    const visitorCounts = visitors.map((visitor) => visitor.visitorCount);

    res.json({ labels, visitors: visitorCounts });
  } catch (error) {
    console.error("Error fetching visitors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { label, visitorCount } = req.body;

  try {
    const newVisitor = new Visitor({ label, visitorCount });
    await newVisitor.save();
    res.status(201).json(newVisitor);
  } catch (error) {
    console.error("Error adding visitor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
