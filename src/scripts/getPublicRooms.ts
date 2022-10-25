import { AxiosResponse } from "axios";

import { RoomType } from "./index.d";
import api from "./api";

/**
 * This is the get public rooms api script, this script will fetch all the public rooms.
 *
 * @note This function does not take any arguments.
 * @return {Array<RoomType>} This function will return the rooms in an array format.
 */

const getPublicRooms = async (): Promise<Array<RoomType>> => {
  let rooms: Array<RoomType> = [];

  await api.instance
    .get(`${api.endpoints.getPublicRooms}?key=${api.apiKey}`)
    .then((data: AxiosResponse): void => {
      rooms = data.data;
    })
    .catch((err: unknown): void => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });

  return rooms;
};

export default getPublicRooms;
