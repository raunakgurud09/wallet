const express = require("express");
const {
  register,
  login,
  profile,
  load,
  logout,
} = require("../controller/auth.controller");
const { orders, orderCapture } = require("../controller/load.controller");
const { createOrderRazorPay, verifyRazorPayOrder } = require("../controller/razorPay.controller");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post();
router.route("/profile").get(profile);
router.route("/check-balance").get();
router.route("/load").post(load);
router.route("/logout").get(logout);
router.route("/razorpay/neworder").post(createOrderRazorPay);
router.route("/razorpay/verifyorder").post(verifyRazorPayOrder);



// router.route("/orders").post(orders);
// router.route("/orders/:orderID/capture").post(orderCapture);

module.exports = router;
