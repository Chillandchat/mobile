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
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { clearSessionData } from "../redux/action";
import Icon from "./Icon";
import { RootState } from "../redux/index.d";

/**
 * This is the chat room bar component. This component will render the bar that
 * will display the chat room information button as well as the controls for the chat.
 *
 * @prop {RoomType} roomData The data about the room.
 */

const ChatRoomBar: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const { sessionStatus } = useSelector((state: RootState): RootState => state);
  const windowDimensions: ScaledSize = Dimensions.get("window");

  React.useEffect((): any => () => dispatch(clearSessionData()), []);

  const style: any = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: windowDimensions.width * 0.07,
    },
  });

  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={(): void => {
          navigation.navigate("menu");
        }}
      >
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <Icon
        iconLetter={sessionStatus.name[0]}
        color={sessionStatus.iconColor}
        size={50}
      />
      <TouchableOpacity
        onPress={(): void => {
          navigation.navigate("room-details");
        }}
      >
        <Feather name="info" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatRoomBar;
