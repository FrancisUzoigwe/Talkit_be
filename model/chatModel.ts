import { model, Document, Schema } from "mongoose";

interface iChat {
  members?: [];
}

interface iChatData extends iChat, Document {}
const chatModel = new Schema<iChatData>(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default model<iChatData>("chats", chatModel);

