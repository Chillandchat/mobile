//Importing packages
import { NotificationMessage } from "./types";
import logo from "../content/logo.svg";

//Notify function
export const notify = (message: NotificationMessage) => {
  //Send notification
  new Notification(message.tittle, {
    body: message.body,
    icon: logo,
  });
};
