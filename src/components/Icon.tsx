import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";

import { IconProps } from "./index.d";

/**
 * This is the Icon component for displaying the icons for users and rooms.
 *
 * @prop {string} iconLetter The letter that the icon displays.
 * @prop {string} color The background color of the icon.
 * @optional @prop {() => void} onPress The function to call when the icon is pressed.
 * @optional @prop {boolean} touchable If the icon is touchable.
 */

const Icon: React.FC<IconProps> = (props: IconProps) => {
  const style: any = StyleSheet.create({
    container: {
      borderRadius: 1000,
      backgroundColor: props.color,
      height: props.size || 60,
      width: props.size || 60,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontFamily: "poppinsLight",
      fontSize: 30,
      paddingTop: Platform.OS === "ios" ? 0 : 3,
      color: "#ffff",
    },
  });

  if (props.touchable) {
    return (
      <TouchableOpacity style={style.container} onPress={props.onPress}>
        <Text style={style.text}>{props.iconLetter.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={style.container}>
      <Text style={style.text}>{props.iconLetter.toUpperCase()}</Text>
    </View>
  );
};

export default Icon;
