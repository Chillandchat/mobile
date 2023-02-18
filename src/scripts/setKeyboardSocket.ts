//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import Constants from "expo-constants";
import { v4 as uuid } from "uuid";
import { io } from "socket.io-client";

import { KeyboardMode } from "./index.d";

/**
 * This is the set keyboard socket function this function will set the keyboard socket to the mode you specify.
 *
 * @param {string} room The room of the typing user.
 * @param {string} user The user of the typing user.
 * @param {KeyboardMode} mode The mode of the typing user.
 */

const setKeyboardSocket = async (
  room: string,
  user: string,
  mode: KeyboardMode
): Promise<void> => {
  const responseToken: string = uuid();
  const socket: any = io(String(Constants.expoConfig?.extra?.SOCKET_URL), {
    transports: ["websocket"],
  });

  socket.emit(
    "server-keyboard",
    room,
    user,
    String(Constants.expoConfig?.extra?.API_KEY),
    responseToken,
    mode
  );

  socket.on("connect-error", (): void => {
    throw new Error(
      "Error: cannot connect to server \n  Error code: CC_ERROR_0318"
    );
  });

  socket.on(`error:token(${responseToken})`, (err: string): void => {
    socket.disconnect();
    throw new Error(`Error: ${err} \n   Error code: CC_ERROR_0318`);
  });

  socket.on(`typing:token(${responseToken})`, (): void => {
    socket.disconnect();
  });

  socket.on(`stopped-typing:token(${responseToken})`, (): void => {
    socket.disconnect();
  });
};

export default setKeyboardSocket;
