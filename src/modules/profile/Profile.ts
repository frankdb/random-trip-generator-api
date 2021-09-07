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
  location: {
    type: Sequelize.STRING,
  },
  bio: {
    type: Sequelize.TEXT,
  },
  places_visited: {
    type: Sequelize.STRING,
  },
  bucket_list: {
    type: Sequelize.STRING,
  },
});

module.exports = Profile;
