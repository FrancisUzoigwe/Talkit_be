import express, { Application } from "express";
import { mainApp } from "./mainApp";
import { talkitDB } from "./config/talkitDB";

const port: number = 2345;

const app: Application = express();

mainApp(app);
const Server = app.listen(port, () => {
  talkitDB();
});

process.on("uncaughtException", (error: any) => {
  console.log("uncaughtException", error?.text);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection", reason?.text);
  Server.close(() => {
    process.exit(1);
  });
});
