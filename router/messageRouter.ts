import express from "express";
import { addMessage, getMessages } from "../controller/messageController";

const router = express.Router();
router.route("/").post(addMessage);
router.route("/:chatID").get(getMessages);

export default router;
