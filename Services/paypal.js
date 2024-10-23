const axios = require("axios");
const router = require("express").Router();
const Booking = require("../models/bookings");
const Host = require("../models/hosts");
const mongoose = require("mongoose");

async function generateAccessToken() {
  try {
    const response = await axios({
      url: process.env.PAYPAL_URL + "/v1/oauth2/token",
      method: "POST",
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams({
        grant_type: "client_credentials",
      }).toString(),
    });
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error generating access token:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to generate PayPal access token");
  }
}

exports.createOrder = async (bookingId) => {
  try {
    const accessToken = await generateAccessToken();

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      console.error("Invalid booking ID:", bookingId);
      throw new Error("Invalid booking ID");
    }

    const booking = await Booking.findById(bookingId).populate({
      path: "host_id",
      model: Host,
    });

    if (!booking) {
      console.error("Booking not found for ID:", bookingId);
      throw new Error("Booking not found");
    }

    const totalAmount = booking.payment.amount;
    const commissionAmount = booking.commission.amount;
    const hostAmount = totalAmount - commissionAmount;

    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: booking.payment.coin,
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: booking.payment.coin,
                value: totalAmount.toFixed(2),
              },
            },
          },
          description: `Booking for ${booking.host_id.name.en}`,
          custom_id: bookingId,
          items: [
            {
              name: `Booking for ${booking.host_id.name.en}`,
              description: `Check-in: ${
                booking.check_in_date.toISOString().split("T")[0]
              }, Check-out: ${
                booking.check_out_date.toISOString().split("T")[0]
              }`,
              unit_amount: {
                currency_code: booking.payment.coin,
                value: totalAmount.toFixed(2),
              },
              quantity: "1",
            },
          ],
        },
      ],
      application_context: {
        return_url: `${process.env.BASE_URL}/success?bookingId=${bookingId}`,
        cancel_url: `${process.env.BASE_URL}/cancel?bookingId=${bookingId}`,
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        brand_name: "Booking.com",
      },
    };

    const response = await axios({
      url: process.env.PAYPAL_URL + "/v2/checkout/orders",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: JSON.stringify(orderData),
    });

    if (response.headers["content-type"].includes("application/json")) {
      return response.data;
    } else {
      console.error("Received non-JSON response from PayPal:");
      console.error(response.data);
      throw new Error("Invalid response from PayPal API");
    }
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    if (error.response) {
      console.error(
        "PayPal API response:",
        error.response.status,
        error.response.data
      );
    }
    throw new Error("Failed to create PayPal order: " + error.message);
  }
};

async function payHost(booking) {
  try {
    const hostAmount = booking.payment.amount - booking.commission.amount;

    const accessToken = await generateAccessToken();

    const payoutData = {
      sender_batch_header: {
        sender_batch_id: `HOST_PAYOUT_${booking._id}`,
        email_subject: "You have a payout!",
        email_message: "You have received a payout for your recent booking.",
      },
      items: [
        {
          recipient_type: "EMAIL",
          amount: {
            value: hostAmount.toFixed(2),
            currency: booking.payment.coin,
          },
          sender_item_id: `PAYOUT_${booking._id}`,
          recipient_wallet: "PAYPAL",
          receiver: "sb-ddq5d31340110_api1.business.example.com",
          note: `Payout for booking ${booking._id}`,
        },
      ],
    };

    const response = await axios({
      method: "POST",
      url: `${process.env.PAYPAL_URL}/v1/payments/payouts`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: payoutData,
    });

    return response.data;
  } catch (error) {
    console.error("Error paying host:", error);
    if (error.response) {
      console.error(
        "PayPal API error response:",
        error.response.status,
        JSON.stringify(error.response.data, null, 2)
      );
    }
    throw new Error(`Failed to process host payout: ${error.message}`);
  }
}

exports.capturePayment = async (paymentId, bookingId) => {
  try {
    const accessToken = await generateAccessToken();

    const response = await axios({
      url: process.env.PAYPAL_URL + `/v2/checkout/orders/${paymentId}/capture`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      console.error("Booking not found for ID:", bookingId);
      throw new Error("Booking not found");
    }

    if (!booking.host_id) {
      console.error("host_id is missing for booking:", bookingId);
      throw new Error("host_id is required");
    }

    const commissionAmount = booking.payment.amount * booking.commission.rate;
    booking.commission.amount = commissionAmount;

    if (response.data.status === "COMPLETED") {
      booking.status = "COMPLETED";
      booking.payment.status = "PAID";
      booking.payment.date = new Date();
      booking.payment.payment_id = paymentId;

      await booking.save();

      try {
        await payHost(booking);
      } catch (payoutError) {
        console.error(
          `Failed to process host payout for booking ${bookingId}:`,
          payoutError
        );
        booking.payoutStatus = "FAILED";
        await booking.save();
      }
    }

    return response.data;
  } catch (error) {
    console.error("Error capturing payment:", error);
    throw new Error("Failed to capture payment: " + error.message);
  }
};

router.post("/pay", async (req, res) => {
  try {
    const { bookingId } = req.body;
    const order = await exports.createOrder(bookingId);
    res.json({ id: order.id });
  } catch (error) {
    console.error("Error processing payment:", error);
    if (
      error.message.includes("Invalid booking ID") ||
      error.message.includes("Booking not found")
    ) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.get("/success", async (req, res) => {
  try {
    const { token, PayerID, bookingId } = req.query;
    const response = await exports.capturePayment(token, bookingId);
    res.json(response);
  } catch (error) {
    console.error("Error processing successful payment:", error);
    res.status(500).json({ message: "Failed to process payment" });
  }
});

router.get("/cancel", (req, res) => {
  const { bookingId } = req.query;
  res.status(200).json({ message: "Payment cancelled" });
});

module.exports = {
  paypal: {
    createOrder: exports.createOrder,
    capturePayment: exports.capturePayment,
  },
  router,
};
