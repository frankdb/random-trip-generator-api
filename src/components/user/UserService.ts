const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User");
const profileService = require("../profile/ProfileService");
import ProfileDAL from "../profile/ProfileDAL";

const findUser = async (email: string) => {
  try {
    let user = await User.findOne({
      where: { email },
    });
    return user ? user : null;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const findUserById = async (userId: number) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    return user;
  } catch (err) {
    console.error(err);
  }
};

const signupUser = async (
  email: string,
  password: string,
  name: string,
  userType: string
) => {
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password,
      name,
    });

    await ProfileDAL.createProfile(newUser.dataValues.id);

    const payload = {
      user: {
        id: newUser.dataValues.id,
      },
    };

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: "1h" },
        (err: any, token: any) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error with sign up");
  }
};

const checkIfPasswordMatches = async (user: any, password: any) => {
  try {
    const passwordsMatch = await bcrypt.compare(password, user.password);
    return passwordsMatch;
  } catch (err) {
    console.error(err);
  }
};

const loginUser = async (user: any, password: string) => {
  try {
    const payload = {
      user: {
        id: user.id,
      },
    };

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: "1h" },
        (err: any, token: any) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  findUser,
  signupUser,
  loginUser,
  checkIfPasswordMatches,
  findUserById,
};
