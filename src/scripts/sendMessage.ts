//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
// @ts-ignore
import { SOCKET_URL, API_KEY } from "@env";
import { v4 as uuid } from "uuid";
import { io } from "socket.io-client";

import { MessageType } from "./index.d";
import filterWord from "./filterWord";

/**
 * This is the send message function this function will send a mesage to the socket server.
 *
 * @param {MessageType} message The message to be sent
 */

const sendMessage = async (message: MessageType): Promise<void> => {
  const responseToken = uuid();
  const socket = io(SOCKET_URL);

  const filteredContent = filterWord(message.content);
  message.content = filteredContent;

  socket.emit("server-message", message, API_KEY, responseToken);

  socket.on(`sent:token(${responseToken})`, (): void => {
    socket.disconnect();
  });

  socket.on(`error:token(${responseToken})`, (err: unknown): void => {
    socket.disconnect();
    throw new Error(`Error: ${err} \n   Error code: CC_ERROR_0318`);
  });

  socket.on("connect-error", (): void => {
    socket.disconnect();
    throw new Error("Error: Connection error. \n   Error code: CC_ERROR_0001");
  });
};

export default sendMessage;
