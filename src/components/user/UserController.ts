require("dotenv").config();
import { Request, Response } from "express";
const User = require("./User");
const userService = require("./UserService");
// const userLogService = require("../user_log/UserLogService");
// const { signupSchema, loginSchema } = require("../../utils/validationSchema");
var cookie = require("cookie");

// POST /api/user/signup
exports.signupUser = async (req: Request, res: Response) => {
  console.log("getting in here======");
  let { email, password, name } = req.body;

  try {
    // await signupSchema.validateAsync(req.body);

    const user = await userService.findUser(email);
    if (!user) {
      const token = await userService.signupUser(
        email,
        password,
        name
        // userType
      );
      console.log("token=======", { token });
      // res.status(200).json({ token });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", token, {
          httpOnly: true,
          // secure: process.env.NODE_ENV !== "development",
          secure: false,
          // sameSite: "strict",
          maxAge: 3600,
          path: "http://localhost:8080/signup",
        })
      );
      res.status(200).send("token sent");
    } else {
      res.status(400).json({ errors: [{ message: "Invalid credentials" }] });
    }
  } catch (err) {
    console.log("ERR=====", err);
    if (err.isJoi) {
      return res.status(400).json({ errors: err.details });
    } else {
      return res.status(500).json(err);
    }
  }
};

exports.loginUser = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  try {
    // await loginSchema.validateAsync(req.body);

    const user = await userService.findUser(email);

    if (!user) {
      res.status(401).json({ errors: [{ message: "Invalid credentials" }] });
    } else {
      const passwordsMatch = await userService.checkIfPasswordMatches(
        user,
        password
      );
      if (passwordsMatch) {
        const token = await userService.loginUser(user, password);
        // await userLogService.logUserLogin(email);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ errors: [{ message: "Invalid credentials" }] });
      }
    }
  } catch (err) {
    if (err.isJoi) {
      return res.status(400).json({ errors: err.details });
    } else {
      return res.status(500).json(err);
    }
  }
};

exports.getCurrentUser = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
