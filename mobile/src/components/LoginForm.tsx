import React from "react";
import { LoginFormProps as Props } from ".";
import { Feather } from "@expo/vector-icons";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ScaledSize,
  Text,
} from "react-native";

/**
 *  This is the Login form element of the login page.
 *
 *  @prop {loginFormTypeSelector} type The type of the form. @see props.d.ts
 *  @prop {void} onTextChange The callback of the onTextChange callback event.
 *  @optional @prop {boolean} safeEntry Whetherthe form has a safe entry feature.
 */

const LoginForm: React.FC<Props> = (props: Props) => {
  const windowDimensions: ScaledSize = Dimensions.get("window");

  const style: any = StyleSheet.create({
    container: {
      margin: 15,
      width: windowDimensions.width / 1.2,
      borderBottomWidth: 2,
      borderTopColor: "transparent",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "#E5E5E5",
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
    },
    text: {
      fontFamily: "poppinsBold",
      fontSize: 19,
    },
    input: {
      marginBottom: 12,
    },
  });

  return (
    <View style={style.container}>
      <View style={style.headerContainer}>
        <Text style={style.text}>
          {props.type !== "username"
            ? props.type === "password" ? "Password" : "Confirm Password"
            : "Username"}
        </Text>
        <Feather
          name={props.type === "username" ? "user" : "key"}
          size={24}
          color="black"
        />
      </View>
      <TextInput
        placeholder=""
        onChangeText={props.onTextChange}
        secureTextEntry={props.safeEntry}
        style={style.input}
      />
    </View>
  );
};

export default LoginForm;
