const express = require("express");
const User = require("../moduls/User");
const bcrypt = require("bcrypt");
const generateToken = require("../helpers/Token");

/* ------------ SinUp ---------- */
const UserSignup = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    const haveUser = await User.findOne({ email });
    if (haveUser) {
      return res
        .status(200)
        .json({ message: "User Have User", seccuss: false, status: 11 });
    }
    if (!name) {
      return res
        .status(200)
        .json({ message: "name is requir", seccuss: false, status: 12 });
    }
    if (!email) {
      return res
        .status(200)
        .json({ message: "email is requir", seccuss: false, status: 14 });
    }
    if (!email.includes("@gmail.com")) {
      return res
        .status(200)
        .json({ message: "carect  email ", seccuss: false, status: 15 });
    }
    if (!password) {
      return res
        .status(200)
        .json({ message: "password is requir", seccuss: false, status: 17 });
    }
    if (!phone) {
      res
        .status(200)
        .json({ message: "phone is requir", seccuss: false, status: 18 });
    }
    if (phone.length != 10) {
      return res.status(200).json({
        message: "phone must be 10 leter",
        seccuss: false,
        status: 188,
      });
    }
    if (!address) {
      return res
        .status(200)
        .json({ message: "address is requir", seccuss: false, status: 19 });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      phone,
      address,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User creected ", seccuss: true, status: 20, newUser });
  } catch (error) {
    res.status(500).json({ message: "server error", seccuss: false });
  }
};

/* ----------- Login User ------- */

const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User Not found", seccuss: false, status: 21 });
    }
    const token = generateToken(user);
    const machPassword = await bcrypt.compare(password, user.password);
    if (machPassword) {
      return res.status(200).json({
        message: `Your Are Login ${user.name}`,
        seccuss: true,
        status: 14,
        token,
        user,
      });
    } else {
      return res
        .status(200)
        .json({ message: "Password Not mach", seccuss: false, status: 16 });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error", seccuss: false });
  }
};

module.exports = { UserSignup, UserLogin };
