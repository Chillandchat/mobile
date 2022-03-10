import { MessageSchemaType } from "./index.d";
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
import getAllRooms from "./endpoints/getAllRooms";
import createRoom from "./endpoints/createRoom";
import siteMap from "./endpoints/sitemap";
import rateLimit from "express-rate-limit";
import joinRoom from "./endpoints/joinRoom";
import searchMessge from "./endpoints/SearchMessage";
import debug from "./debug";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import message from "./schema/messageSchema";

const app: express.Express = express();
const httpServer: any = createServer(app);
const io = new Server(httpServer);

const PORT: number = Number(process.env.PORT) || 3000;
const SOCKET_PORT: number = Number(process.env.SOCKET_PORT) || 3001;

const apiLimiter = rateLimit({
  windowMs: 1 * 30 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
});

dotenv.config();
debug.init();

mongoose.connect(String(process.env.DATABASE_URI));

app.use(express.json());
app.use(cors({}));
app.use(apiLimiter);

app.get("/", home);
app.post("/api/signup", signup);
app.post("/api/login", login);
app.get("/api/get-messages", getMessages);
app.get("/api/get-users", getUsers);
app.get("/api/get-user-info", getUserInfo);
app.get("/api/get-rooms", getAllRooms);
app.post("/api/search-message", searchMessge);
app.post("/api/block_user", blockUser);
app.post("/api/create-room", createRoom);
app.post("/api/join-room", joinRoom);
app.get("/site-map", siteMap);

// Socket server:

io.on("connection", (socket: Socket): void => {
  socket.on(
    "server-message",
    async (
      payload: MessageSchemaType,
      key: string,
      responseToken: string
    ): Promise<void> => {
      if (key === process.env.KEY) {
        io.emit(`client-message:room(${payload.room})`, payload);
        try {
          const newMessage = new message({
            id: payload.id,
            user: payload.user,
            content: payload.content,
            room: payload.room,
          });

          await newMessage.save().then((): void => {
            io.emit(`sent:token-${responseToken}`);
            debug.log(`Message: ${payload.id} saved and emited.`);
          });
        } catch (err: unknown) {
          io.emit(`error:token(${responseToken})`, err);
        }
      } else {
        io.emit(`error:token(${responseToken})`, "Invalid key");
      }
    }
  );
});

// DERECATED:
app.post("/derecated/report-user", reportUser);

const notFound = (_req: any, res: any, _next: any): void => {
  res
    .status(404)
    .send(
      "REQUEST ERROR: The page you requested was not found, please type a valid URL."
    );
};
app.use(notFound);

app.listen(PORT, (): void => {
  debug.log(
    `Server Ready and listening on port ${PORT}, press CTRL + C to stop operation.`
  );
});

httpServer.listen(SOCKET_PORT, (): void => {
  debug.log(`Socket listening on port ${SOCKET_PORT}`);
});
