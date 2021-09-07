import { NextFunction, Request, Response } from "express";
import ProfileDAL from "./ProfileDAL";

export default class ProfileController {
  /**
   * GET api/profile
   * Gets the profile of the current user
   */
  static async getProfile(req: any, res: Response, next: NextFunction) {
    const userId = req.user.id;
    console.log(
      "CHECKING FOR REQ SESSION IN PROFILE CONTROLLER - get profile====",
      req.session
    );
    try {
      const profile = await ProfileDAL.getProfile(userId);
      return res.json(profile);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  /**
   * PUT api/profile
   * Updates the profile of the current user
   */
  static async updateProfile(req: any, res: Response, next: NextFunction) {
    const userId = req.user.id;
    console.log(
      "CHECKING FOR REQ SESSION IN PROFILE CONTROLLER - update profile====",
      req.session
    );
    const { profile } = req.body;
    try {
      const updatedProfile = await ProfileDAL.updateProfile(userId, profile);
      return res.status(200).json(updatedProfile);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
