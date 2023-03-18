import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScaledSize,
} from "react-native";

import { ButtonProps as Props } from "./index.d";

/**
 * This is the button component, this is what Chill&chat uses as it's primary button.
 * Basically, this button will just simply put run the onPress function once pressed.
 *
 * @prop {string} color The background color of the button.
 * @prop {string} textColor The color of the text on the button.
 * @prop {() => void} onPress The function to call when the button is pressed.
 * @prop {string} text The text that the button displays.
 * @optional @prop {boolean} disabled If the button is disabled.
 */

const Button: React.FC<Props> = (props: Props) => {
  const windowDimensions: ScaledSize = Dimensions.get("window");

  const style: any = StyleSheet.create({
    container: {
      backgroundColor: props.color,
      width: windowDimensions.width / 1.4,
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius: 12,
      opacity: props.disabled ? 0.3 : 1,
    },
    content: {
      color: props.textColor,
      fontFamily: "poppinsExtraBold",
      padding: 14,
    },
  });

  return (
    <TouchableOpacity
      onPress={props.disabled ? (): void => undefined : props.onPress}
      style={style.container}
    >
      <Text style={style.content}>{props.text.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

export default Button;
