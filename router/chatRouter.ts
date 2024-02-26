import express from "express";
import { createChat, findChat, userChats } from "../controller/chatController";

const router = express.Router();
router.route("/").post(createChat);
router.route("/:userID").get(userChats);
router.route("/find/:firstID/:secondID").get(findChat);

export default router;
