const Profile = require("./Profile");

export default class ProfileDAL {
  static async createProfile(userId: string) {
    try {
      return await Profile.create({ userId });
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  static async getProfile(userId: string) {
    try {
      return await Profile.findOne({
        where: { userId },
      });
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  static async updateProfile(userId: string, profileObj: any) {
    try {
      const profile = await this.getProfile(userId);
      for (const [key, value] of Object.entries(profileObj)) {
        profile[key] = profileObj[key];
      }
      await profile.save();
      return profile;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
