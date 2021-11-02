//Importing packages
import { apiEndpoints as endpoints, api } from "./apiRequest";

//login function  
const login = (username: string, password: string): any => {
  //Check if username and password is empty
  if (username == undefined || password == undefined) {
    //Throw error
    console.error("username and password must be provided");
    return;
  }
  //Contact api
  try {
    api
      .get(`${endpoints.loginEndpoint}${username}/${password}`)
      .then((response) => {
        //TODO - Modify redux state
        console.log(response);
      });
  }
  //Catch error s
  catch (err) {
    console.error(err);
    return;
  }
};
//Export login function
export default login;
