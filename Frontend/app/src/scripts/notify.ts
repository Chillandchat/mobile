//Importing packages
import { NotificationMessage } from "./types";
import logo from "../content/logo.svg";

//Notify function
export const notify = (message: NotificationMessage): void => {
  //Send notification
  new window.Notification(message.tittle, {
    body: message.body,
    icon: logo,
  });
};
