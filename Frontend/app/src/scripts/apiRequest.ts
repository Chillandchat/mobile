//Importing packages
import axios from "axios";
import dotenv from "dotenv";

//Env configuration
dotenv.config();

//Endpoint interface
interface ApiEndpointType {
  getAllMessageEndpoint: string;
  loginEndpoint: string;
  signupEndpoint: string;
  getAllUsersEndpoint: string;
  findUserEndpoint: string;
  blockUsersEndpoint: string;
}

//Api endpoints
export const apiEndpoints: ApiEndpointType = {
  getAllMessageEndpoint: "/api/get_all_message",
  getAllUsersEndpoint: "/api/get_all_users",
  signupEndpoint: "/api/sign_up",
  loginEndpoint: "/api/login",
  findUserEndpoint: "/api/get_user",
  blockUsersEndpoint: "/api/block_user",
};

//Axios for api requests
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
