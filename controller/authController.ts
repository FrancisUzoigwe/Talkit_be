import { Request, Response } from "express";
import authModel from "../model/authModel";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await authModel.create({ name, email, password: hashed });

    return res.status(200).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const verifyAccount = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await authModel.findById(userID);
    if (user?.verified === false) {
      const realUser = await authModel.findByIdAndUpdate(user?._id, {
        verified: true,
        new: true,
      });

      return res.status(201).json({
        message: "User updated successfully",
        data: realUser,
      });
    } else {
      return res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });
    if (user) {
      const checked = await bcrypt.compare(password, user.password!);
      if (checked) {
        return res.status(400).json({
          message: "Signed in successfully",
          data: user,
        });
      } else {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Error occured",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured ",
      data: error?.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await authModel.findByIdAndDelete(userID);
    return res.status(201).json({
      message: "Account deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error deleting user",
      data: error,
    });
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await authModel.findById(userID);
    const { firstName, lastName, address, phoneNumber } = req.body;
    if (user?.verified === true) {
      const update = await authModel.findByIdAndUpdate(
        userID,
        { new: true },
        { firstName: firstName, lastName, address, phoneNumber }
      );
    }

    return res.status(201).json({
      message: "Profile updated succcessfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while updating user info",
      data: error?.message,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await authModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Users found successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while getting all users",
      data: error?.message,
    });
  }
};



