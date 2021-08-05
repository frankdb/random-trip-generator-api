require("dotenv").config();
import { Request, Response } from "express";
const User = require("./User");
const userService = require("./UserService");

/**
 * POST /api/user/signup
 * @param
 * @return
 */
exports.signupUser = async (req: any, res: Response) => {
  const { email, password, name } = req.body;

  try {
    const user = await userService.findUser(email);
    if (!user) {
      const token = await userService.signupUser(email, password, name);
      req.session.something = true;
      res.status(200).json({ token });
    } else {
      res.status(400).json({ errors: [{ message: "Invalid credentials" }] });
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
    // if (err.isJoi) {
    //   return res.status(400).json({ errors: err.details });
    // } else {
    //   return res.status(500).json(err);
    // }
  }
};

exports.loginUser = async (req: any, res: Response) => {
  let { email, password } = req.body;

  console.log("logging IN!!", req && req.session);

  try {
    const user = await userService.findUser(email);
    req.session.something = true;

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
