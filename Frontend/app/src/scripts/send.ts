//Importing packages
import dotenv from "dotenv";
import { io } from "socket.io-client";
import badWords from "./badWords";
import { Message } from "./types";

//Env configuration
dotenv.config();

//Send function
export const send = (message: Message): void => {
  const username: string = message.user;

  //Web socket
  const socket = io(process.env.REACT_APP_WEBSOCKET_URL);

  //Check if message is empty
  if (message.content === undefined || message.content === "") return;

  //Filter words
  for (let i: number = 0; i < badWords.length; i++) {
    //Check word
    if (message.content.includes(badWords[i])) {
      //Edit message
      message.content = `ERROR: Message UNAVAILABLE, The message that @${username} was trying send\nwas been DELETED by the profanity filter.`;
      message.user = "SYSTEM";
      break;
    } else continue;
  }

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
