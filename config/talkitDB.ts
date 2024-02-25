import mongoose from "mongoose";

const url: string = "mongodb://127.0.0.1:27017/talkitDB";
export const talkitDB = () => {
  mongoose.connect(url).then(() => {
    console.log("Database connection successfully established");
  });
};
