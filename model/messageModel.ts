import { model, Document, Schema } from "mongoose";

interface iMessage {
  senderID?: string;
  receiverID?: string;
  text?: string;
}

interface iMessageData extends iMessage, Document {}
const messageModel = new Schema<iMessageData>(
  {
    senderID: { type: String },
    receiverID: { type: String },
    text: { type: String },
  },
  { timestamps: true }
);

export default model<iMessageData>("messages", messageModel);
