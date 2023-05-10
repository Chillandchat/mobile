import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import {
  NavigationContainer,
  ParamListBase,
  StackNavigationState,
  TypedNavigator,
} from "@react-navigation/native";
import { Alert, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StackNavigationEventMap } from "@react-navigation/stack/lib/typescript/src/types";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Chat from "./screens/Chat";
import Error from "./screens/Error";
import store from "./redux/index";
import BlockError from "./screens/BlockError";
import CreateRoom from "./screens/CreateRoom";
import JoinRoom from "./screens/JoinRoom";
import Information from "./screens/Information";
import loadFonts from "../assets/fonts/loader";
import RoomInformation from "./screens/RoomInformation";
import RoomDangerZone from "./screens/RoomDangerZone";
import SendImage from "./screens/SendImage";
import MessageOptions from "./screens/MessageOptions";
import UserProfile from "./screens/UserProfile";
import RoomId from "./screens/RoomId";
import UpdateIconColor from "./screens/UpdateIconColor";
import PublicRooms from "./screens/PublicRooms";
import ImageBase from "./screens/ImageBase";
import ControlCenter from "./screens/ControlCenter";
import Share from "./screens/Share";
import AddRoomOptions from "./screens/AddRoomOptions";

/**
 * This is the router component for the application, This component
 * contains the stack for the navigation system and also loads important data in the application.
 */

namespace app {
  SplashScreen.preventAutoHideAsync();

  export const Router: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect((): void => {
      loadFonts()
        .then((): void => {
          setLoading(false);
        })
        .catch((err: string): void => {
          Alert.alert(
            "Error while loading fonts",
            "An error occurred while trying to load fonts, try restarting the application or submit a issue report on Chill&chat official github. \nError code: CC_ERROR_0015"
          );
          console.error(
            "Error: Unable to load fonts. \n    at Router.tsx expoAppLoading.default \n    at loader.ts \n  Error code: CC_ERROR_0015"
          );
          console.error(`Expo error message: ${err}`);
        });
    }, []);

    const NavigatorStack: TypedNavigator<
      ParamListBase,
      StackNavigationState<ParamListBase>,
      NativeStackNavigationOptions,
      StackNavigationEventMap,
      ({
        initialRouteName,
        children,
        screenListeners,
        screenOptions,
        ...rest
      }: any) => JSX.Element
    > = createNativeStackNavigator();

    React.useEffect((): void => {
      if (!loading) SplashScreen.hideAsync();
    }, [loading]);

    const style: any = StyleSheet.create({
      container: {
        flex: 1,
      },
    });

    if (loading) {
      return null;
    } else {
      return (
        <Provider store={store}>
          <View style={style.container}>
            <StatusBar style="dark" />
            <NavigationContainer>
              <NavigatorStack.Navigator initialRouteName="login">
                <NavigatorStack.Group screenOptions={{ presentation: "modal" }}>
                  <NavigatorStack.Screen
                    name="share"
                    component={Share}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="send-image"
                    component={SendImage}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="message-options"
                    component={MessageOptions}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="add-room-options"
                    component={AddRoomOptions}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="image-base"
                    component={ImageBase}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="room-danger-zone"
                    component={RoomDangerZone}
                    options={{
                      headerShown: false,
                    }}
                  />
                </NavigatorStack.Group>
                <NavigatorStack.Group>
                  <NavigatorStack.Screen
                    name="login"
                    component={Login}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="information"
                    component={Information}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="user-profile"
                    component={UserProfile}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="sign-up"
                    component={Signup}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="control-center"
                    component={ControlCenter}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="join-room"
                    component={JoinRoom}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="update-icon-color"
                    component={UpdateIconColor}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="error"
                    component={Error}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <NavigatorStack.Screen
                    name="block-error"
                    component={BlockError}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <NavigatorStack.Screen
                    name="room-details"
                    component={RoomInformation}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="chat"
                    component={Chat}
                    options={{ headerShown: false }}
                  />

                  <NavigatorStack.Screen
                    name="public-rooms"
                    component={PublicRooms}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="create-room"
                    component={CreateRoom}
                    options={{ headerShown: false }}
                  />
                  <NavigatorStack.Screen
                    name="room-id"
                    component={RoomId}
                    options={{ headerShown: false }}
                  />
                </NavigatorStack.Group>
              </NavigatorStack.Navigator>
            </NavigationContainer>
          </View>
        </Provider>
      );
    }
  };
}

export default app.Router;
