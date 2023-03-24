import { AxiosResponse } from "axios";

import api from "./api";

/**
 * This is the upload token script,
 * this script will upload a notification token to the API sever.
 *
 * The notification token can be useful when calling notifications from the backend.
 * The token is stored for later use and convenience.
 *
 * @param {string} user The user to apply the token to.
 * @param {string} token The token to upload. Of course!
 */

const uploadToken = async (user: string, token: string): Promise<void> => {
  await api.instance
    .post(`${api.endpoints.uploadToken}?key=${api.apiKey}`, {
      user: user,
      token: token,
    })
    .then((_data: AxiosResponse): void => {})
    .catch((err: unknown): void => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });
};

export default uploadToken;
