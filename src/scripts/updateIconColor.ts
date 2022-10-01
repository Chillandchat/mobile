import { AxiosResponse } from "axios";

import api from "./api";

/**
 * This is the update icon color function, this function just simply sends a update icon color request to the server.
 *
 * @param {string} color The color to change the icon to.
 * @param {string} user The user to change the color to.
 *
 * @note Please make sure the color is a hex value
 * @info https://github.com/Chillandchat/api/wiki/Update-icon-color-endpoint
 */

const updateIconColor = async (color: string, user: string): Promise<void> => {
  await api.instance
    .post(`${api.endpoints.updateIconColor}?key${api.apiKey}`, {
      user: user,
      color: `#${color}`,
    })
    .then((_data: AxiosResponse): void => {})
    .catch((err: unknown): void => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });
};

export default updateIconColor;
