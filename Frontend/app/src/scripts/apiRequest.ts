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
  getAllMessageEndpoint: "/api/messages/get",
  getAllUsersEndpoint: "/api/users/get/all",
  signupEndpoint: "/api/users/post/create/",
  loginEndpoint: "/api/users/get/",
  findUserEndpoint: "/api/users/get/",
  blockUsersEndpoint: "/api/users/block/",
};

//Axios for api requests
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
