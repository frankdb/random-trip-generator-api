import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req: any, res: Response, next: NextFunction) => {
  console.log("IN MIDDLEWARE=====", req.session);

  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }

  // if (req.session.userId) {
  //   req.user = { id: req.session.userId };
  //   next();
  // } else {
  //   res.status(401).redirect("http://localhost:8080/login");
  // }
};
