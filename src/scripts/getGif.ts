import { AxiosResponse } from "axios";

import api from "./api";

/**
 * This is the get gif script, this script will get a list of GIFs
 * from the GIPHY API via the CHill&chat API.
 *
 * @param {string} search The search query.
 * @param {boolean} useTrending Wether use trending GIFs or not.
 * @returns {any} Returns a list of either trending or searched GIFs.
 * @see https://developers.giphy.com/docs/api/schema#gif-object for schema definition.
 */

const getGif = async (search: string, useTrending: boolean): Promise<any> => {
  let gifs: Array<any> = [];

  await api.instance
    .get(
      `${api.endpoints.getGif}?key=${api.apiKey}${
        useTrending ? `` : `&search=${search}`
      }`
    )
    .then((data: AxiosResponse): void => {
      gifs = data.data;
    })
    .catch((err: unknown): void => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });

  return gifs;
};

export default getGif;
