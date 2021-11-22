//Importing packages
import dotenv from "dotenv";
import { io } from "socket.io-client";
import { Message } from "./types";

//Env configuration
dotenv.config();

//Send function
export const send = (message: Message): void => {
  //Web socket
  const socket = io(process.env.REACT_APP_WEBSOCKET_URL);

  //Check if message is empty
  if (message.content === undefined || message.content === "") return;

  //Emit message
  socket.emit("message", message);

  //Handle error
  socket.on("connect_error", (err) => {
    //Throw error
    console.error(`Uncaught Connection Error: ${err.message}`);
    console.warn(
      "If you have found a bug please report bugs here: https://github.com/AlvinC888/Chill-chat/issues"
    );

    //Disconnect socket
    socket.disconnect();
  });
};
