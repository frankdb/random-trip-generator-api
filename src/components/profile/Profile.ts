export {};
const Sequelize = require("sequelize");
const db = require("../../config/database");

const User = db.define("profile", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  currentPosition: {
    type: Sequelize.STRING,
  },
  company: {
    type: Sequelize.STRING,
  },
  website: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },
  photo: {
    type: Sequelize.STRING,
  },
  bio: {
    type: Sequelize.TEXT,
  },
  githubUsername: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
