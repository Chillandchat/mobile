//Ask notification function
export const askNotification = (): void => {
  //Check notification status
  if (
    Notification.permission === "denied" ||
    Notification.permission === "default"
  ) {
    //Request permission
    window.Notification.requestPermission();
  } else return;
};
