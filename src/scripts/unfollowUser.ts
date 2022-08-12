import { AxiosResponse } from "axios";

import api from "./api";

/**
 * This is the unfollow user function, this function will unfollow a user via the API server.
 *
 * @param {string} targetUser The user that is being unfollowed.
 * @param {string} user The user unfollowing.
 */

const unfollowUser = async (
  targetUser: string,
  user: string
): Promise<void> => {
  await api.instance
    .post(`${api.endpoints.unfollowUser}?key=${api.apiKey}`, {
      user: user,
      targetUser: targetUser,
    })
    .then((_data: AxiosResponse): void => {})
    .catch((err: unknown): void => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });
};

export default unfollowUser;
