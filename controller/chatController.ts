import { Request, Response } from "express";
import chatModel from "../model/chatModel";

export const createChat = async (req: Request, res: Response) => {
  const newChat = new chatModel({
    members: [req.body.senderID, req.body.receiverID],
  });
  try {
    const result = await newChat.save();
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured ",
      data: error?.message,
    });
  }
};

export const userChats = async (req: Request, res: Response) => {
  try {
    const chat = await chatModel.find({
      members: { $in: [req.params.userID] },
    });

    return res.status(200).json({
      message: "Chats successfully found",
      data: chat,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: " Error occured",
      data: error?.message,
    });
  }
};

export const findChat = async (req: Request, res: Response) => {
  try {
    const chat = await chatModel.findOne({
      members: { $all: [req.params.firstID, req.params.secondID] },
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};
