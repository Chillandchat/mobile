import { AxiosResponse } from "axios";

import api from "./api";

/**
 * This is the update description function, this function will update a user's description via the API server.
 *
 * @param {string} user The user's description to be updated.
 * @param {string} description The new description of the user.
 */

const updateDescription = async (
  user: string,
  description: string
): Promise<void> => {
  await api.instance
    .post(`${api.endpoints.updateDescription}?key=${api.apiKey}`, {
      username: user,
      description: description,
    })
    .then((_data: AxiosResponse): void => {})
    .catch((err: unknown): void => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });
};

export default updateDescription;
