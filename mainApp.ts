import cors from "cors";
import { Application, Request, Response, json } from "express";
import morgan from "morgan";
import chat from "./router/chatRouter";
import auth from "./router/authRouter";
export const mainApp = (app: Application) => {
  app.use(json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PATCH"],
    })
  );
  app.use(morgan("dev"));
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "You're now using Francis Uzoigwe's Talkit Api ",
      });
    } catch (error: any) {
      console.log(error?.text);
    }
  });
  app.use("/chat", chat);
  app.use("/", auth);
};
