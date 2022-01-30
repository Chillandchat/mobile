import { AxiosResponse } from "axios";
import { MessageType } from "../types/api";
import api from "./api";

/**
 * This function will return all messages in the database via the api.
 *
 * @returns {Promise<Array<MessageType> | void>} The return type of the function, this function will return all messages is operation was successful.~
 * But if the operation was not successful the function will return undefined(AKA void).
 */

const getMessages = async (): Promise<Array<MessageType> | void> => {
  try {
    api.instance
      .get(`${api.endpoints.getMessages}?key=${api.apiKey}`)
      .then((data: AxiosResponse): void => {
        if (data.status !== 200) {
          throw new Error(
            `Request failed with status code: ${data.status} \n   Error code: CC_ERROR_0318`
          );
        } else {
          return data.data;
        }
      })
      .catch((err: any): void => {
        throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
      });
  } catch (err: any) {
    throw new Error(`Error: ${err} \n   Error code: CC_ERROR_0022`);
  }
};

export default getMessages;
