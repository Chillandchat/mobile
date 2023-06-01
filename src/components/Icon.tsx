import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import { IconProps as Props } from "./index.d";
import decideOverlay from "../utils/decideOverlay";

/**
 * This is the Icon component, this component is what Chill&chat displays icons such as users and rooms.
 * The icon can be customizable by changing the icon letter and color values of the props below 👇.
 *
 * @prop {string} iconLetter The letter that the icon displays.
 * @prop {string} color The background color of the icon.
 * @optional @prop {() => void} onPress The function to call when the icon is pressed.
 * @optional @prop {boolean} touchable If the icon is touchable.
 */

const Icon: React.FC<Props> = (props: Props) => {
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
      fontSize: props.size !== undefined ? props.size / 2 : 30,
      paddingTop: Platform.OS === "ios" ? 0 : 3,
      color: decideOverlay(props.color, "#ffffff", "#000000"),
    },
  });

  return props.touchable ? (
    <TouchableOpacity style={style.container} onPress={props.onPress}>
      <Text style={style.text}>{props.iconLetter?.toUpperCase()}</Text>
    </TouchableOpacity>
  ) : (
    <View style={style.container}>
      <Text style={style.text}>{props.iconLetter.toUpperCase()}</Text>
    </View>
  );
};

export default Icon;
