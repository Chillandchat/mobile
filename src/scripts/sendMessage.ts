//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import Constants from "expo-constants";
import { v4 as uuid } from "uuid";
import { io } from "socket.io-client";

import { MessageType } from "./index.d";

/**
 * This is the send message function this function will send a message to the socket server.
 *
 * @param {MessageType} message The message to be sent
 * @optional @param {() => void} callback The callback function to be called after the message is sent.
 */

const sendMessage = async (
  message: MessageType,
  callback?: () => void
): Promise<void> => {
  const responseToken: string = uuid();
  const socket: any = io(String(Constants.expoConfig?.extra?.SOCKET_URL), {
    transports: ["websocket"],
  });

  socket.emit(
    "server-message",
    message,
    String(Constants.expoConfig?.extra?.API_KEY),
    responseToken
  );

  socket.on(`sent:token(${responseToken})`, (): void => {
    callback?.();
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
