//Importing packages
import { api, apiEndpoints } from "./apiRequest";
import { v4 as uuid } from "uuid";

//Signup function
export const signUp = async (
  username: string,
  password: string,
  passwordConfirm: string
): Promise<Boolean> => {
  //Ok status
  let okStatus = false;

  //Check input conditions
  if (
    username === undefined ||
    password === undefined ||
    passwordConfirm === undefined
  ) {
    //Set ok status
    okStatus = false;
    //Throw error
    console.error(
      "Uncaught Error: username and password must be provided\ndo not leave field blank.\nat <input> SignUpPage.tsx\nIf you have found a bug, please report bug at: https://github.com/AlvinC888/Chill-chat/issues"
    );
  }
  if (passwordConfirm !== password) {
    //Set ok status
    okStatus = false;
    //Throw error
    console.error(
      "Uncaught Error: both password and password confirm must be the same \nat <input> SignUpPage.tsx\nIf you have found a bug, please report bug at: https://github.com/AlvinC888/Chill-chat/issues"
    );
  } /*Set ok status:*/ else okStatus = true;

  //Check if ok status is true
  if (okStatus) {
    //Contact API
    try {
      await api
        .post(apiEndpoints.signupEndpoint, {
          id: uuid(),
          username: username,
          password: password,
          blocked: false,
          verified: false,
          bot: false,
        })
        .then((response: any): void => {
          //Check if response was successful
          if (
            response.status === 400 ||
            response.status === 404 ||
            response.status === 500
          )
            /*Set ok status:*/ okStatus = false;
          /*Set ok status:*/ else okStatus = true;
        });
    } catch (err) {
      //Throw error
      console.error(err);
      
      //Set ok status
      okStatus = false;
    }
  }
  //Return status
  return okStatus;
};
