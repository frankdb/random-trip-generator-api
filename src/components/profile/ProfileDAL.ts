const Profile = require("./Profile");

export default class ProfileDAL {
  static async getProfile(userId: string) {
    try {
      return await Profile.findOne({ where: { userId } });
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  static async updateProfile(userId: string) {
    try {
      const profile = this.getProfile(userId);
    } catch (err) {}
  }
}
