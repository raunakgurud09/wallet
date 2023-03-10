// // For a fully working example, please see:
// // https://github.com/paypal-examples/docs-examples/tree/main/standard-integration
// require("dotenv").config();
// const fetch = require("cross-fetch");
// const { CLIENT_ID, APP_SECRET } = process.env;

// // create a new order
// const orders = async (req, res) => {
//   const { amount } = req.body;
//   const order = await createOrder(amount);
//   res.json(order);
// };

// // capture payment & store order information or fullfil order
// const orderCapture = async (req, res) => {
//   const { orderID } = req.params;
//   const captureData = await capturePayment(orderID);
//   // TODO: store payment information such as the transaction ID
//   res.json(captureData);
// };

// ////////////////////////
// // PayPal API helpers //
// ////////////////////////

// // use the orders api to create an order
// async function createOrder(loadMoney) {
//   const accessToken = await generateAccessToken();
//   const url = `${base}/v2/checkout/orders`;
//   const response = await fetch(url, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify({
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "INR",
//             value: loadMoney,
//           },
//         },
//       ],
//     }),
//   });
//   const data = await response.json();
//   return data;
// }

// // use the orders api to capture payment for an order
// async function capturePayment(orderId) {
//   const accessToken = await generateAccessToken();
//   const url = `${base}/v2/checkout/orders/${orderId}/capture`;
//   const response = await fetch(url, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   const data = await response.json();
//   return data;
// }

// // generate an access token using client id and app secret
// async function generateAccessToken() {
//   const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
//   const response = await fetch(`${base}/v1/oauth2/token`, {
//     method: "post",
//     body: "grant_type=client_credentials",
//     headers: {
//       Authorization: `Basic ${auth}`,
//     },
//   });
//   const data = await response.json();
//   return data.access_token;
// }

// module.exports = {
//   orders,
//   orderCapture,
// };
