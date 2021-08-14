const User = require("./User");

export default class UserDAL {
  static async findUserByEmail(email: string) {
    try {
      return await User.findOne({
        where: { email },
      });
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  static async findUserById(userId: string) {
    try {
      return await User.findOne({
        where: { id: userId },
      });
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  static async createUser(email: string, password: string, name: string) {
    try {
      return await User.create({
        email,
        password,
        name,
      });
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
