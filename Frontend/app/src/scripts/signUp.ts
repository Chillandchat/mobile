//Importing packages
import { api, apiEndpoints } from "./apiRequest";
import { v4 as uuid } from "uuid";

//Signup function
export const signUp = async (
  username: string,
  password: string,
  passwordConfirm: string
) => {
  //Ok status
  let okStatus = false;

  //Check input conditions
  if (
    username == undefined ||
    password == undefined ||
    passwordConfirm == undefined
  ) {
    okStatus = false;
  } else if (passwordConfirm != password) okStatus = false;
  else okStatus = true;

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
          onDeleteList: false,
        })
        .then((response) => {
          //Check if response was successful
          if (
            response.status === 400 ||
            response.status === 404 ||
            response.status == 500
          )
            okStatus = false;
          else okStatus = true;
        })
        .catch((err) => {
          //Throw error
          console.error(err);
          okStatus = false;
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
