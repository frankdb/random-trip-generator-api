const Profile = require("../profile/Profile");

// const getAllUserExperience = async (userId: number) => {
//   try {
//     const userExperience = await Experience.findAll({
//       where: { userId: userId },
//       attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
//     });
//     return userExperience;
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = { getAllUserExperience };

const createProfileForUser = async (userId: string) => {
  try {
    await Profile.create({ userId });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createProfileForUser,
};
