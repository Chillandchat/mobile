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
 * @param {string} id The id of the user that is creating the room.
 * @returns {Promise<void>}
 */

const createRoom = async (
  name: string,
  password: string,
  id: string
): Promise<void> => {
    await api.instance
      .post(`${api.endpoints.createRoom}?key=${api.apiKey}`, {
        id: uuid(),
        name: name,
        passcode: password,
        user: id,
      })
      .then((_data: AxiosResponse): void => {})
      .catch((err: unknown): void => {
        throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
      });
};

export default createRoom;
