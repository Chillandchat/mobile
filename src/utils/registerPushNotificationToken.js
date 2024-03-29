import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

/**
 * This is the register notification token function.
 * This function will return the token of the push notification notifier.
 *
 * Originally implemented by members of https://expo.dev/
 * @source https://docs.expo.dev/versions/latest/sdk/notifications/
 *
 * Modified and reimplemented by Alvin cheng.
 *
 * @returns {string} The push notification token in a string type.
 * @note may return undefined in error cases.
 */

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.error(
        "Failed to get push token for push notification! \n   Error code: CC_ERROR_0022`"
      );
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.error(
      "Incompatible push notification device!\n   Error code: CC_ERROR_0022"
    );
    return;
  }

  return token;
}

export default registerForPushNotificationsAsync;
