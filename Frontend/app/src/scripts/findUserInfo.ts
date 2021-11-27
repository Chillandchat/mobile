//Importing packages
import { api, apiEndpoints } from "./apiRequest";
import { UserInfoReturn, User } from "./types";

//Find user function
export const findUserInfo = async (user: string): Promise<UserInfoReturn> => {
  //Variables
  let userInfo: User;
  let okStatus: boolean = false;

  //Contact API
  try {
    await api
      .get(`${apiEndpoints.findUserEndpoint}/${user}`)
      .then((response: any): void => {
        //Check response status
        if (response.status === 200) {
          //Assign data
          userInfo = response.data;

          //Assign ok status
          okStatus = true;
        }
      });
  } catch (err) {
    //Throw error
    console.error(err);

    //Assign ok status
    okStatus = false;
  }

  //Return data
  return {
    okStatus: okStatus,
    data: userInfo,
  };
};
