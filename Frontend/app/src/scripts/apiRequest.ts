//Importing packages
import axios from "axios";

//Endpoint interface config
export interface apiEndpointType {
  getAllMessageEndpoint?: string;
  loginEndpoint?: string;
  signupEndpoint?: string;
  getAllUsersEndpoint?: string;
  findUserEndpoint?: string;
  blockUsersEndpoint?: string;
}

//Api endpoints
export const apiEndpoints: apiEndpointType = {
  getAllMessageEndpoint: "/api/messages/get",
  getAllUsersEndpoint: "/api/users/get/all",
  signupEndpoint: "/api/users/create/post",
  loginEndpoint: "/api/users/get/",
  findUserEndpoint: "/api/users/get/",
  blockUsersEndpoint: "/api/users/block/",
};

//Axios for api requests
export const api = axios.create({
  baseURL: "http://localhost:3001",
});
