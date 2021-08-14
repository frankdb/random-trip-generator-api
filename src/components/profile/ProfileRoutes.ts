import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const auth = require("../../middleware/auth");
const profileController = require("./ProfileController");
import { ProfileController } from "./ProfileController";
// const fileUpload = require("../../middleware/fileUpload");

// router.get("/me", auth, profileController.getCurrentUserProfile);
// router.post("/", auth, profileController.createOrUpdateUserProfile);
router.put("/", auth, ProfileController.updateProfile);
// router.post(
//   "/photo",
//   auth,
//   fileUpload.single("photo"),
//   profileController.addOrUpdatePhoto
// );
// router.get("/", auth, profileController.getAllProfiles);
// router.get("/:userId", auth, profileController.getProfileByUserId);

module.exports = router;
