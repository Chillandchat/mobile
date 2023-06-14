//! "import "react-native-get-random-values";" MUST BE FIRST!!
import "react-native-get-random-values";
import { AxiosRequestHeaders, AxiosResponse } from "axios";
import { v4 as uuid } from "uuid";
import { Buffer } from "@craftzdog/react-native-buffer";

import { ContentType } from "./index.d";
import api from "./api";
import backwardsCompatibleUpload from "./legacyUploadContent";

/**
 * This is the upload content script, this script will upload the content to the upload content endpoint.
 *
 * @param {string} user The user that the image is sent on behalf.
 * @param {Buffer} content The content of the image or gif.
 * @param {ContentType} type The type of the content format in the content parameter.
 * @param {boolean} useNewBinaryUploadEndpoint Whether to use the new binary upload endpoint or not.
 *
 * @note Uses old endpoint script by default.
 */

const uploadContent = async (
  user: string,
  content: any,
  type: ContentType,
  useNewBinaryUploadEndpoint: boolean = false
): Promise<string | void> => {
  const id: string = uuid();

  if (!useNewBinaryUploadEndpoint) {
    backwardsCompatibleUpload(user, content.toString("base64"), type);
    return;
  }
  const requestUrl: string = `${api.endpoints.uploadContent}?key=${
    api.apiKey
  }&id=${id}&type=${type.replace(
    "&",
    "%26"
  )}&user=${user}&useBinaryUploadEndpoint=true`;
  console.log(type, requestUrl);
  const headers: AxiosRequestHeaders = {
    "Content-Type": "application/octet-stream",

    // TODO WARNING: Duplicate header due to faulty if statement issue in backend.
    "content-type": "application/octet-stream",
  };

  await api.instance
    .post(requestUrl, content, {
      headers,
    })
    .then((_data: AxiosResponse): void => {})
    .catch((err: any): void => {
      console.log(JSON.stringify(err?.response));
      throw new Error(`API Error: ${err} \n   Error code: CC_ERROR_0318`);
    });

  return id;
};

export default uploadContent;
