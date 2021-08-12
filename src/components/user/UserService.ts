const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User");
const profileService = require("../profile/ProfileService");

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

    // let userTypeId;
    // if (userType === "JOB_SEEKER") {
    //   userTypeId = 1;
    // } else if (userType === "EMPLOYER") {
    //   userTypeId = 2;
    // }

    const newUser = await User.create({
      email,
      password,
      name,
      // userTypeId,
      // is_active: true,
      // sms_notification_active: false,
      // email_notification_active: false,
    });

    await profileService.createProfileForUser(newUser.dataValues.id);

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
