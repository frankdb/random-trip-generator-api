import { NextFunction, Request, Response } from "express";
import ProfileDAL from "./ProfileDAL";
const Profile = require("./Profile");
const User = require("../user/User");

export class ProfileController {
  /**
   * PUT api/profile
   * Updates the user profile
   * @param
   * @return
   */
  static async updateProfile(req: any, res: Response, next: NextFunction) {
    console.log(req.body);
    const userId = req.user.id;
    console.log("USER ID====", userId);
    try {
      // const profile = await ProfileDAL.getProfile(userId);
      await Profile.updateProfile(userId, null);
      // return res.json(profile);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

exports.getCurrentUserProfile = async (req: any, res: Response) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.user.id } });

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// POST api/profile/

exports.createOrUpdateUserProfile = async (req: any, res: Response) => {
  const profileData = req.body;

  try {
    let profile = await Profile.findOne({ where: { userId: req.user.id } });

    if (profile) {
      profile = await Profile.update(profileData, {
        where: { userId: req.user.id },
      });
      return res.json(profile);
    }

    profileData.userId = req.user.id;
    profile = await Profile.create(profileData);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllProfiles = async (req: any, res: Response) => {
  try {
    const profiles = await Profile.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    res.status(200).send(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.addOrUpdatePhoto = async (req: any, res: Response) => {
  try {
    let profile = await Profile.findOne({ where: { userId: req.user.id } });

    if (!profile) {
      return res.status(400).send("No profile");
    }

    profile.photo = req.file.path;
    await profile.save();
    const userProfile = await Profile.findOne({
      where: { userId: req.user.id },
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    res.json(userProfile);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
