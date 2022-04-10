import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ScaledSize,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { ChatRoomBarProps as Props } from "./index.d";
import { clearSessionData } from "../redux/action";

/**
 * This is the chat room bar component. This component will render the bar that
 * will display the chat room information as well as the controls for the chat.
 */

namespace ChatRoomBar{
export const component: React.FC<Props> = (props) => {
  const dispatch: any = useDispatch();

  const windowDimensions: ScaledSize = Dimensions.get("window");

  const navigation: any = useNavigation();

  const style: any = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: windowDimensions.width * 0.07,
    },
    roomName: {
      fontFamily: "poppinsExtraBold",
      fontSize: 20,
    },
  });
  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={async (): Promise<void> => {
          await dispatch(clearSessionData());
          navigation.navigate("menu");
        }}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={style.roomName}>{props.roomData.name}</Text>

      <TouchableOpacity onPress={(): void => {
          navigation.navigate("room-details")
      }}>
        <Feather name="info" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
}}

export default ChatRoomBar.component;
