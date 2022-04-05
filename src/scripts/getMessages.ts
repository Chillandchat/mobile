import { AxiosResponse } from "axios";

import { MessageType } from "./index.d";
import api from "./api";

/**
 * This function will return all messages in the database via the api.
 *
 * @param room The room to get messages from.
 * @returns {Promise<Array<MessageType>} The return type of the function, this function will return all messages.
 */

const getMessages = async (room: string): Promise<Array<MessageType>> => {
  let messages: Array<MessageType> = [];
  
  await api.instance
    .get(`${api.endpoints.getMessages}?key=${api.apiKey}&room=${room}`)
    .then((data: AxiosResponse): void => {
      messages = data.data; 
    })
    .catch((err: unknown): void => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });

  return messages;
};

export default getMessages;
