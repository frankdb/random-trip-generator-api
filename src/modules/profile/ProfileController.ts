import { NextFunction, Request, Response } from "express";
import ProfileDAL from "./ProfileDAL";
import ProfileMapper from "./ProfileMapper";

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
      const profileDTO = await ProfileMapper.toDTO(profile);
      return res.json(profileDTO);
    } catch (err) {
      console.error(err);
      return next(err);
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
      return next(err);
    }
  }
}
