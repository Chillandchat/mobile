import { ButtonProps as Props } from "../types/propsType";
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScaledSize,
} from "react-native";

/**
 * This is the button component that renders the button on screen and
 * will run the action provided.
 *
 * @param {string} color The background color of the button.
 * @param {string} text The text that the button displays. OPTIONAL
 * @param {void} onPress The function to call when the button is pressed.
 * @param {string} textColor The color of the text on the button.
 */

const Button: React.FC<Props> = (props: Props) => {
  const windowDimensions: ScaledSize = Dimensions.get("window");

  const style: any = StyleSheet.create({
    container: {
      backgroundColor: props.color,
      width: windowDimensions.width / 1.3,
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius: windowDimensions.width / 28.0,
    },
    content: {
      color: props.textColor,
      fontFamily: "poppinsExtraBold",
      padding: 14,
    },
  });
  return (
    <TouchableOpacity onPress={props.onPress} style={style.container}>
      <Text style={style.content}>
        {props.text?.toUpperCase() || "UNTITTLED BUTTON"}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
