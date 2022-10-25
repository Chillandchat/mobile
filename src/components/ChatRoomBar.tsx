import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScaledSize,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Dispatch } from "redux";

import { clearSessionData } from "../redux/action";
import { RootState } from "../redux/index.d";
import Icon from "./Icon";

/**
 * This is the chat room bar component, this component is located on the top the chat room.
 * The chat room bar displays the controls such as the back button and the information button.
 *
 * @note This component is just a plain component for cleanness, there are no props for this component.
 */

const ChatRoomBar: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const navigation: any = useNavigation();

  const windowDimensions: ScaledSize = Dimensions.get("window");

  const { sessionStatus }: RootState = useSelector(
    (state: RootState): RootState => state
  );

  React.useEffect((): any => (): any => dispatch(clearSessionData()), []);

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
          navigation.push("room-details");
        }}
      >
        <Feather name="info" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatRoomBar;
