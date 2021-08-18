import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const auth = require("../../middleware/auth");
const UserController = require("./UserController");

router.get("/", auth, UserController.getCurrentUser);
router.get("/all", UserController.getUsers);
router.post("/signup", UserController.signupUser);
router.post("/login", UserController.loginUser);
router.get("/logout", UserController.logoutUser);

module.exports = router;
