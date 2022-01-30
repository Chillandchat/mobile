import { AxiosResponse } from "axios";
import api from "./api";

/**
 * This function will authenticate the user via the data api.
 *
 * @param {string} username The username inputed by the user.
 * @param {string} password The password inputed by the user.
 * @returns {Promise<void>} The return type of the function.
 */

const login = async (username: string, password: string): Promise<void> => {
  try {
    await api.instance
      .post(`${api.endpoints.login}/?key=${api.apiKey}`, {
        user: username,
        password: password,
      })
      .then((data: AxiosResponse): void => {
        if (data.status !== 200) {
          throw new Error(
            `Login failed with status code: ${data.status} \n   Error code: CC_ERROR_0318`
          );
        }
      })
      .catch((err: any): void => {
        throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
      });
  } catch (err: any) {
    throw new Error(`Error: ${err} \n   Error code: CC_ERROR_0022`);
  }
};

export default login;
