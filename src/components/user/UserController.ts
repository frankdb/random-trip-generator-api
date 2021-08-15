require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import UserDAL from "./UserDAL";
const User = require("./User");
const userService = require("./UserService");

export class UserController {
  // static async registerUser(req: any, res: Response, next: NextFunction) {
  //   try {
  //     await UserService.registerUser(email, password, name);
  //   } catch (err) {
  //     console.error(err);
  //     next(err);
  //   }
  // }
}

/**
 * POST /api/user/signup
 * @param
 * @return
 */
exports.signupUser = async (req: any, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const user = await UserDAL.findUserByEmail(email);
    if (!user) {
      const token = await userService.signupUser(email, password, name);
      const user = await UserDAL.findUserByEmail(email);
      req.session.userId = user.id;
      console.log("REQ SESSION====", req, req.session);
      res.status(200).json({ token });
    } else {
      res.status(400).json({ errors: [{ message: "Invalid credentials" }] });
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

exports.loginUser = async (req: any, res: Response) => {
  let { email, password } = req.body;
  req.session.isAuthenticated = true;

  console.log("REQ SESSION IN LOGIN====", req.session);

  try {
    const user = await UserDAL.findUserByEmail(email);

    if (!user) {
      res.status(401).json({ errors: [{ message: "Invalid credentials" }] });
    } else {
      const passwordsMatch = await userService.checkIfPasswordMatches(
        user,
        password
      );
      if (passwordsMatch) {
        const token = await userService.loginUser(user, password);
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

exports.getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};
