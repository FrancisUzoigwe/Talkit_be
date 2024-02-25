import { model, Document, Schema, Types } from "mongoose";

interface iAuth {
  name?: string;
  email?: string;
  address?: string;
  password?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  imageID?: string;
  likes?: string;
  verified?: boolean;
  friend?: {}[];
  post?: {}[];
}

interface iAuthData extends iAuth, Document {}
const authModel = new Schema<iAuthData>(
  {
    name: { type: String },
    email: { type: String },
    address: { type: String },
    password: { type: String },
    phoneNumber: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    image: { type: String },
    imageID: { type: String },
    likes: { type: String },
    verified: { type: Boolean, default: false },
    friend: [
      {
        type: Types.ObjectId,
        ref: "friends",
      },
    ],
    post: [
      {
        type: Types.ObjectId,
        ref: "posts",
      },
    ],
  },
  { timestamps: true }
);

export default model<iAuthData>("auths", authModel);
