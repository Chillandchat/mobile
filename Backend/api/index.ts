import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import home from "./endpoints/home";
import getMessages from "./endpoints/getMessages";
import signup from "./endpoints/signup";
import getUsers from "./endpoints/getUsers";
import login from "./endpoints/login";
import getUserInfo from "./endpoints/getUserInfo";
import reportUser from "./endpoints/reportUser";
import blockUser from "./endpoints/blockUser";

dotenv.config();
const app: express.Express = express();
const PORT: string = process.env.PORT || "8080";

mongoose.connect(String(process.env.DATA_URI));

app.use(express.json());
app.use(cors({}));

app.get("/", home);
app.post("/api/signup", signup);
app.post("/api/login", login);
app.get("/api/get-messages", getMessages);
app.get("/api/get-users", getUsers);
app.get("/api/get-user-info", getUserInfo);

// DERECATED:
app.post("/api/report-user", reportUser);
app.put("/api/block_user", blockUser);

const notFound = (_req: any, res: any, _next: any): void => {
  res
    .status(404)
    .send(
      "REQUEST ERROR: The page you requested was not found, please type a valid URL."
    );
};
app.use(notFound);

app.listen(PORT, (): void => {
  console.log(
    `Server Ready and listening on port ${PORT}.\nPress CTRL + C to stop operation.`
  );
});
