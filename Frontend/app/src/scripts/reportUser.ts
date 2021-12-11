//Importing packages
import { apiEndpoints, api } from "./apiRequest";

//Report user function
export const reportUser = async (
  targetUser: string,
  reporterUser: string,
  reporterReason: string
): Promise<boolean> => {
  //Ok status
  let okStatus: boolean = false;

  //Contact API
  try {
    await api
      .post(apiEndpoints.reportUserEndpoint, {
        reportUser: targetUser,
        user: reporterUser,
        reason: reporterReason,
      })
      .then((response: any): void => {
        //Check response status
        if (response.status === 200) /*Set Ok status:*/ okStatus = true;
        /*Set ok status:*/ else okStatus = false;
      });
  } catch (err) {
    //Throw error
    console.error(err);

    //Set ok status
    okStatus = false;
  }

  //Return
  return okStatus;
};
