const JWT = require("jsonwebtoken");
const express = require("express");
const ddtenv = require("dotenv");
ddtenv.config();
const key = process.env.KEY;
const Auth = async (req, res, next) => {
  const AuthHeader = req.headers.authorization;
  // console.log(AuthHeader);
  if (!AuthHeader) {
    return res.status(401).json({ message: "Missing token ", seccues: false });
  }
  const AuthToken = AuthHeader.split(" ");
  const token = AuthToken[1];
  // console.log(token);
  JWT.verify(token, key, (err, decode) => {
    if (err) {
      return res.status(403).json({ message: "Token increact" });
    }
    req.user = decode;
    next();
  });
};

module.exports = Auth;
