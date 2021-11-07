//Importing packages
import { apiEndpoints, api } from "./apiRequest";

//login function
export const login = async (
  username: string,
  password: string
): Promise<boolean> => {
  //Ok status variable
  let okStatus: boolean = false;

  //Check if username and password is empty
  if (username === undefined || password === undefined) {
    //Throw error
    console.error(
      "Uncaught Error: username and password must be provided\n  do not leave field blank\n   at <input> LoginPage.tsx\nIf you have found a bug, please report bug at: https://github.com/AlvinC888/Chill-chat/issues"
    );
    //Change ok status
    okStatus = false;
  } else {
    okStatus = true;
  }
  //Check if ok status is true
  if (okStatus) {
    //Contact api
    try {
      await api
        .get(`${apiEndpoints.loginEndpoint}${username}/${password}`)
        .then((response) => {
          //Check API response status
          if (response.status === 404 || response.status === 400) {
            okStatus = false;
          }
          if (response.status === 200) okStatus = true;
        });
    } catch (err) {
      //Throw error
      console.error(err);
      okStatus = false;
    }
  }
  //Return status
  return okStatus;
};