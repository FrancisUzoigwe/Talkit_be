import express from "express";
import {
  deleteUserAccount,
  getAllUsers,
  registerUser,
  signinUser,
  updateUserImage,
  updateUserInfo,
  verifyAccount,
  viewOneAccount,
} from "../controller/authController";
import multer from "multer";
const uploads = multer().single("image");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/signin").post(signinUser);
router.route("/:userID/verify-account").patch(verifyAccount);
router.route("/:userID/delete-account").delete(deleteUserAccount);
router.route("/:userID/update-info").patch(updateUserInfo);
router.route("/:userID/update-image").patch(uploads, updateUserImage);
router.route("/get-all-accounts").get(getAllUsers);
router.route("/:userID/get-one-account").get(viewOneAccount);
export default router;
