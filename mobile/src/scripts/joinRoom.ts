import { AxiosResponse } from "axios";

import api from "./api";

/**
 * This is the the join room function this function will call the server to join a room.
 *
 * @param {string} username The username of the user.
 * @param {string} roomId The room id.
 * @param {string} roomPassword The password of the room.
 * @returns {Promise<void>}
 */

const joinRoom = async (
  username: string,
  roomId: string,
  roomPassword: string
): Promise<void> => {
  try {
    await api.instance
      .post(`${api.endpoints.joinRoom}?key=${api.apiKey}`, {
        user: username,
        id: roomId,
        passcode: roomPassword,
      })
      .then((_data: AxiosResponse): void => {})
      .catch((err: unknown): void => {
        throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
      });
  } catch (err: unknown) {
    throw new Error(`Error: ${err} \n   Error code: CC_ERROR_0022`);
  }
};

export default joinRoom;
