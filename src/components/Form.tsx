import React from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";

import { FormProps } from "./index.d";

/**
 * This is the form component this component will allow the user to input text.
 *
 * @prop {string} placeholder The placeholder of the form.
 * @prop {(text: string) => void} onChangeText The event that will be called when the text is changed and the data will be stored in the parameter.
 * @optional @prop {boolean} safeEntry Whether the text is secure or not.
 * @optional @prop {string} value The value of the text form.
 * @optional @prop {number | string} width The width of the form.
 * @optional @prop {number | string} height The height of the form
 */

const Form: React.FC<FormProps> = (props: FormProps) => {
  const style: any = StyleSheet.create({
    container: {
      backgroundColor: "#E5E5E5",
      width: props.width || "80%",
      justifyContent: "center",
      padding: 20,
      height: props?.height,
      borderRadius: 10000,
      margin: Platform.OS === "android" ? -10 : 0,
    },
  });

  return (
    <View style={style.container}>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={props.onTextChange}
        secureTextEntry={props.safeEntry || false}
        value={props.value}
      />
    </View>
  );
};

export default Form;
