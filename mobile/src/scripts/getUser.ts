import { AxiosResponse } from "axios";

import api from "./api";
import { AuthType } from "./index.d";

/**
 * This function is responsible for returning a user's information from the remote server.
 *
 * @param {string} user The user to get information from.
 * @returns {AuthType} This function returns the user's information.
 * @see {AuthType} for more information about return type.
 */

const getUser = async (user: string): Promise<AuthType | {}> => {
  let userData: AuthType | any = {};

    await api.instance
      .get(`${api.endpoints.getUserInfo}?key=${api.apiKey}&user=${user}`)
      .then((data: AxiosResponse): void => {
        if (data.data !== "") {
          userData = data.data;
        }
      })
      .catch((err: unknown): void => {
        throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
      });

  return userData;
};

export default getUser;
