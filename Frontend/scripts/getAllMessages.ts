// Importing packages
import { apiEndpoints, api } from "./apiRequest";
import { MessageListReturnType } from "./types";
import { Message } from "./types";

// Get all message function
export const getAllMessage = async (): Promise<MessageListReturnType> => {
  // Variables
  let okStatus: boolean;
  let data: Array<Message>;

  // Contact API
  try {
    await api
      .get(apiEndpoints.getAllMessageEndpoint)
      .then((response: any): void => {
        // Check response status
        if (response.status === 200) {
          // Set ok status
          okStatus = true;
          // Set data to response data
          data = response.data;
        } else {
          // Set ok status
          okStatus = false;
          // Throw error
          console.error(
            "Uncaught Error: Server responded with a status of: " +
              response.status
          );
        }
      });
  } catch (err) {
    // Throw error
    console.error(err);

    // Set ok status
    okStatus = false;
  }
  // Return data
  return {
    messages: data,
    status: okStatus,
  };
};
