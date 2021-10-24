import { apiEndpoints, api } from "./apiRequest.js";

const login = () => {
  try {
    api.get(apiEndpoints.loginEndpoint).then((response) => {
      console.log(response);
    });
  } catch (error) {
    console.error(error);
  }
};

export default login;
