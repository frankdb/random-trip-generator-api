import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const auth = require("../../middleware/auth");
const UserController = require("./UserController");

router.get("/", auth, UserController.getCurrentUser);
router.post("/signup", UserController.signupUser);
router.post("/login", UserController.loginUser);

module.exports = router;
