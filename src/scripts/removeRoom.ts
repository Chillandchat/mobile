import { AxiosResponse } from "axios";

import api from "./api";

/**
 * This is the remove room function, this function will remove the user from the room once called.
 * 
 * @param {string} room The room to remove the user from.
 * @param {string} user The user to remove from the room.
 * @returns {Promise<void>} The return type of the function, this function will return undefined(AKA void)
 */

const removeRoom = async (room: string, user: string): Promise<void> => {
  await api.instance
    .post(`${api.endpoints.removeRoom}?key=${api.apiKey}`, {
      id: room,
      user: user,
    })
    .then((_data: AxiosResponse) => {})
    .catch((err: unknown) => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });
};

export default removeRoom;
