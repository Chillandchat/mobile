import { apiEndpoints as endpoints, api } from "./apiRequest";

const login = (username: String, password: String) => {
  try {
    api
      .get(`${endpoints.loginEndpoint}${username}/${password}`)
      .then((response) => {
        console.log(response);
      });
  } catch (err) {
    console.error(err);
  }
};

export default login;
