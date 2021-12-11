//Importing packages
import { api, apiEndpoints } from "./apiRequest";
import { UserListReturnType } from "./types";
import { User } from "./types";

//Get all users function
export const getAllUsers = async (): Promise<UserListReturnType> => {
  //Variables
  let okStatus: boolean;
  let userList: Array<User>;

  //Contact API
  try {
    await api
      .get(apiEndpoints.getAllUsersEndpoint)
      .then((response: any): void => {
        //Check response status
        if (response.status === 200) {
          //Change ok status
          okStatus = true;
          //Assign data to user list
          userList = response.data;
        } else {
          //Set ok status
          okStatus = false;
          
          //Throw error
          console.error(
            "Uncaught Error: The server responded with a status of: " +
              response.status
          );
        }
      });
  } catch (err) {
    //Change ok status
    okStatus = false;
    //Throw error
    console.error(err);
  }
  //Return data
  return {
    status: okStatus,
    data: userList,
  };
};
