//Ask notification function
export const askNotification = (): void => {
  //Check notification status
  if (
    Notification.permission === "denied" ||
    Notification.permission === "default"
  ) {
    //Request permission
    Notification.requestPermission();
  } else return;
};
