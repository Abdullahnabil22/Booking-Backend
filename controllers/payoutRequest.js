// controllers/payoutRequest.js
const PayoutRequest = require("../models/payoutRequest");
const express = require("express");
const router = express.Router();
const OwnerBalance = require("../models/ownerBalance");
const socketService = require("../Services/Socket.IOService");

const createPayoutRequest = async (req, res) => {
  try {
    const { owner_id, amount, paypalEmail } = req.body;

    const ownerBalance = await OwnerBalance.findOne({ owner_id });
    if (!ownerBalance || ownerBalance.current_balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const payoutRequest = new PayoutRequest({
      owner_id,
      amount,
      payment_method: "PayPal",
      payment_reference: paypalEmail,
      status: "PENDING",
    });

    await payoutRequest.save();

    try {
      const io = socketService.getIO();
      io.emit("payout_request", {
        type: "PAYOUT_REQUEST",
        data: {
          owner_id: payoutRequest.owner_id,
          amount: payoutRequest.amount,
          paypalEmail: payoutRequest.payment_reference,
          status: payoutRequest.status,
          created_at: payoutRequest.createdAt,
        },
      });
      console.log("Payout notification sent successfully");
    } catch (notificationError) {
      console.error("Error sending WebSocket notification:", notificationError);
    }

    res.status(201).json({
      message: "Payout request created successfully",
      payoutRequest,
    });
  } catch (error) {
    console.error("Error creating payout request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

router.get("/", async (req, res) => {
  const payouts = await PayoutRequest.find();
  res.json(payouts);
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, payment_date } = req.body;

    const updatedRequest = await PayoutRequest.findByIdAndUpdate(
      id,
      { status, payment_date },
      { new: true }
    );

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: "Error updating payout request" });
  }
});

router.post("/request", createPayoutRequest);

module.exports = router;
