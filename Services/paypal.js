const axios = require("axios");

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
  }
}
generateAccessToken();

exports.createOrder = async () => {
  const accessToken = await generateAccessToken();
  const response = await axios({
    url: process.env.PAYPAL_URL + "/v2/checkout/orders",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00",
          },
        },
      ],
      application_context: {
        return_url: process.env.BASE_URL + "/success",
        cancel_url: process.env.BASE_URL + "/cancel",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        brand_name: "BOOKING.COM",
      },
    }),
  });
  return response.data.links.find((link) => link.rel === "approve").href;
};

exports.capturePayment = async (paymentId) => {
  const accessToken = await generateAccessToken();
  const response = await axios({
    url: process.env.PAYPAL_URL + `/v2/checkout/orders/${paymentId}/capture`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
