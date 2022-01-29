// @ts-ignore
import { API_URL, API_KEY } from "@env";
import axios, { AxiosInstance } from "axios";
import { ApiEndpoints, ApiCombined } from "../types/api";

export const apiKey: string = String(API_KEY);

export const endpoints: ApiEndpoints = {
  home: "/",
  login: "/api/login",
  signup: "/api/signup",
  getMessages: "/api/get-mesages",
  getUserInfo: "/api/get-user-info",
  getUsers: "/api/get-users",
  reportUser: "/api/report-user",
  blockUser: "/api/block-user",
};

export const apiInstance: AxiosInstance = axios.create({
  baseURL: String(API_URL),
});

const api: ApiCombined = {
  apiKey: apiKey,
  endpoints: endpoints,
  instance: apiInstance,
};

export default api;
