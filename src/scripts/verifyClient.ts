import { AxiosResponse } from "axios";
import api from "./api";

/**
 * This is the verify client script, this script will verify the client.
 *
 * @note This script does not require any parameters.
 */

const verifyClient = async (): Promise<void> => {
  await api.instance
    .get(`${api.endpoints.verifyClient}?key=${api.apiKey}`)
    .then((_data: AxiosResponse): void => {})
    .catch((err: unknown): void => {
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });
};

export default verifyClient;
