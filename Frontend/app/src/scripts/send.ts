//Importing packages
import dotenv from "dotenv";
import { io } from "socket.io-client";
import { badWord as words } from "./badWords";
import { Message } from "./types";

//Env configuration
dotenv.config();

//Send function
export const send = (message: Message): void => {
  //Ok status
  let okStatus: boolean;

  //Web socket
  const socket = io(process.env.REACT_APP_WEBSOCKET_URL);

  //Check if message is empty
  if (message.content === undefined || message.content === "") return;

  //Filter words
  for (let i = 0; i < words.length; i++) {
    //Check word
    if (message.content.includes(words[i])) {
      okStatus = false;
      break;
    } else okStatus = true;
  }

  //Check ok status
  if (okStatus) {
    //Emit message
    socket.emit("message", message);
  }

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
