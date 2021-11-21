//Importing packages
import { apiEndpoints, api } from "./apiRequest";
import { Message } from "./types";

//Types
interface ReturnType {
  messages: Array<Message>;
  status: boolean;
}

//Get all message function
export const getAllMessage = async (): Promise<ReturnType> => {
  //Variables
  let okStatus: boolean;
  let data: Array<Message>;

  //Contact API
  try {
    await api.get(apiEndpoints.getAllMessageEndpoint).then((response: any) => {
      //Check response status
      if (response.status === 200) {
        //Set ok status
        okStatus = true;
        //Set data to response data
        data = response.data;
      } else {
        //Set ok status
        okStatus = false;
        //Throw error
        console.error(
          "Uncaught Error: Server responded with a status of: " +
            response.status
        );
      }
    });
  } catch (err) {
    //Throw error
    okStatus = false;
    console.error(err);
  }
  //Return data
  return {
    messages: data,
    status: okStatus,
  };
};
