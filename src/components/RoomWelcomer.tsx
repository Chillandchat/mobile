import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "./Icon";
import { useSelector } from "react-redux";
import { RootState } from "../redux/index.d";

/**
 * This is the room welcomer, this component will be placed at the top of the chat messages.
 * The component will display a welcome message to welcome the user.
 *
 * @note There are no props that needs to be fed into this component.
 */

const RoomWelcomer: React.FC<any> = (_props: any) => {
  const { name, iconColor }: RootState = useSelector(
    (state: RootState): RootState => state.sessionStatus
  );

  const style: any = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      marginVertical: 40,
      marginHorizontal: 15,
      borderWidth: 4,
      borderColor: "#e5e5e5",
      padding: 20,
      paddingBottom: 30,
      borderRadius: 30,
    },
    text: {
      fontFamily: "poppins",
    },
  });
  return (
    <View style={style.container}>
      <Icon iconLetter={name[0]} color={iconColor} size={50} />
      <Text
        style={[
          style.text,
          { fontFamily: "poppinsBold", fontSize: 18, marginVertical: 10 },
        ]}
        numberOfLines={1}
      >
        Welcome to {name}!
      </Text>
      <Text style={style.text}>You may now chat in this room!</Text>
    </View>
  );
};

export default RoomWelcomer;
