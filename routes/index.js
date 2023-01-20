const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res, next) => {
  return res.render("digital.ejs");
});

router.get("/view", (req, res) => {
  return res.render("view.ejs");
});

router.get("/register", (req, res) => {
  return res.render("register.ejs");
});

router.get("/qrcode", (req, res) => {
  return res.render("code.ejs");
});

router.get("/login", (req, res) => {
  return res.render("login.ejs");
});

router.get("/menu", (req, res) => {
  return res.render("menu.ejs");
});

router.get("/account", (req, res) => {
  return res.render("account.ejs");
});

router.get("/payout", (req, res) => {
  return res.render("payout.ejs");
});

router.get("/razorpay", (req, res) => {
  return res.render("razorPay.ejs");
});

module.exports = router;
