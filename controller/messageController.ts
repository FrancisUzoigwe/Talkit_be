import { Request, Response } from "express";
import messageModel from "../model/messageModel";

export const addMessage = async (req: Request, res: Response) => {
  const { chatID, senderID, text } = req.body;
  const message = new messageModel({
    chatID,
    senderID,
    text,
  });
  try {
    const result = await message.save();
    return res.status(201).json({
      message: "Successfully sent a message",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while sending message",
      data: error?.message,
    });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { chatID } = req.body;
  try {
    const result = await messageModel.find({ chatID });
    return res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};
