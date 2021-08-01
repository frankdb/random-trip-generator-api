export {};
const Sequelize = require("sequelize");
const db = require("../../config/database");

const Profile = db.define("profile", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  bio: {
    type: Sequelize.TEXT,
  },
  photo: {
    type: Sequelize.STRING,
  },
});

module.exports = Profile;
