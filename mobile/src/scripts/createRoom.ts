//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { AxiosResponse } from "axios";
import { v4 as uuid } from "uuid";
import api from "./api";

/**
 * This is the create room function, this function will create a room via the server.
 *
 * @param {string} name The name of the room.
 * @param {string} password The password of the room.
 * @param {string} username The username of the user creating the room.
 * @returns {Promise<void>}
 */

const createRoom = async (
  name: string,
  password: string,
  username: string
): Promise<void> => {
  try {
    await api.instance
      .post(`${api.endpoints.createRoom}?key=${api.apiKey}`, {
        id: uuid(),
        name: name,
        passcode: password,
        user: username,
      })
      .then((_data: AxiosResponse): void => {})
      .catch((err: unknown): void => {
        throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
      });
  } catch (err: unknown) {
    throw new Error(`Error: ${err} \n   Error code: CC_ERROR_0022`);
  }
};

export default createRoom;
