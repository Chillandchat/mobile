//Importing packages
import { apiEndpoints, api } from "./apiRequest";

//Types
interface message {
  id: string;
  user: string;
  content: string;
}
interface returnType {
  messages: Array<message | any>;
  status: boolean;
}

//Get all message function
export const getAllMessage = async (): Promise<returnType> => {
  //Variables
  let okStatus: boolean;
  let data: Array<message | any>;

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
        //Throw error
        okStatus = false;
        console.error(
          "Server error: Server responded with a status of: " + response.status
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
