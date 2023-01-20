const User = require("../models/user");
const { createTokenUser, attachCookiesToResponse } = require("../utils/jwt");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email && !password && !name) {
    return res
      .status(400)
      .json({ message: "Name email and password are required" });
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    return res.status(409).json({ message: "Email already exist" });
  }

  //pre userSchema to change password
  try {
    const user = await User.create({
      name,
      email,
      role: role || "user",
      password,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "No user with this email is found" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(309).json({ message: "Invalid credentials..." });
  }

  const tokenUser = createTokenUser(user);
  req.session.user = tokenUser;

  res.status(200).json(user);
};

const logout = async (req, res) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
};

const profile = async (req, res) => {
  const user = req.session.user;
  const foundUser = await User.findById({ _id: user.userId });
  if (!foundUser)
    res.status(400).json({ message: "User with this id doesn't exist" });
  res.status(200).json(foundUser);
};

const load = async (req, res) => {
  const { amount } = req.body;
  const user = req.session.user;

  const amountInt = parseInt(amount);

  const foundUser = await User.findById({ _id: user.userId });
  if (!foundUser)
    return res.status(400).json({ message: "User with this id doesn't exist" });

  try {
    if (true) {
      foundUser.balance += amountInt;
      await foundUser.save();
    }
  } catch (error) {}

  res.status(200).json(foundUser);
};

module.exports = {
  register,
 
  login,
  logout,
  profile,
  load,
};
