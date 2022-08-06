import Constants from "expo-constants";
import axios, { AxiosInstance } from "axios";
import { ApiEndpoints } from "./index.d";

export const apiKey: string = String(Constants.manifest?.extra?.API_KEY);

export const endpoints: ApiEndpoints = {
  home: "/",
  login: "/api/login",
  signup: "/api/signup",
  getMessages: "/api/get-messages",
  getUserInfo: "/api/get-user-info",
  getUsers: "/api/get-users",
  reportRoom: "/api/report-room",
  blockUser: "/api/block-user",
  getRoom: "/api/get-rooms",
  createRoom: "/api/create-room",
  joinRoom: "/api/join-room",
  removeRoom: "/api/remove-room",
};

export const apiInstance: AxiosInstance = axios.create({
  baseURL: String(Constants.manifest?.extra?.API_URL),
});

const api: any = {
  apiKey: apiKey,
  endpoints: endpoints,
  instance: apiInstance,
};

if (
  Constants.manifest?.extra?.API_KEY === undefined ||
  Constants.manifest?.extra?.API_URL === undefined ||
  Constants.manifest?.extra?.SOCKET_URL === undefined
) {
  console.error(
    "Error: API key or API url not found in the .env file, please make sure the variable is set and present. \nError code: CC_ERROR_1591"
  );
}

export default api;
