//Importing packages
import axios from "axios";

//Api endpoints
export const apiEndpoint = {
  loginEndpoint: "/api/users/get/all",
  signupEndpoint: "/api/users/create.post",
};

//Axios for api requests
export const api = axios.create({
  mode: "no-cors",
  baseURL: "http://localhost:8080",
});
