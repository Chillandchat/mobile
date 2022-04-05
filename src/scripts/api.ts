// @ts-ignore
import { API_URL, API_KEY, SOCKET_URL } from "@env";
import axios, { AxiosInstance } from "axios";
import { ApiEndpoints, ApiCombined } from "./index.d";

export const apiKey: string = String(API_KEY);

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
  joinRoom: "/api/join-room"
};

export const apiInstance: AxiosInstance = axios.create({
  baseURL: String(API_URL),
});

const api: ApiCombined = {
  apiKey: apiKey,
  endpoints: endpoints,
  instance: apiInstance,
};

if (API_KEY === undefined || API_URL === undefined || SOCKET_URL === undefined) {
    console.error("Error: API key or API url not found in the .env file, please make sure the variable is set and present. \nError code: CC_ERROR_1591")
}

export default api;
