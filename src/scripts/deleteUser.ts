import { AxiosResponse } from "axios";

import api from "./api";

/**
 * This is the delete user script, this script will delete a user from the database via the API
 *
 * @param {string} user The user to delete.
 * @note This script is destructive and must only be used when necessary.
 */

const deleteUser = async (user: string): Promise<void> => {
  await api.instance
    .post(`${api.endpoints.deleteUser}?key=${api.apiKey}`, {
      user: user,
    })
    .then((_data: AxiosResponse): void => {})
    .catch((err: unknown): void => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });
};

export default deleteUser;
