import React from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";

import { FormProps as Props } from "./index.d";

/**
 * This is the form component, this component is what Chill&chat uses as a form to handle user input.
 *
 * @prop {string} placeholder The placeholder of the form.
 * @prop {(text: string) => void} onChangeText The event that will be called when the text is changed and the data will be stored in the parameter.
 * @optional @prop {boolean} safeEntry Whether the text is secure or not.
 * @optional @prop {string} value The value of the text form.
 * @optional @prop {number | string} width The width of the form.
 * @optional @prop {number | string} height The height of the form
 * @optional @prop {boolean} multiline Whether the text is multiline or not.
 * @optional @prop {(unknown) => void} onKeypress The function to be called on key press.
 * @optional @prop {(property) selection?: {start: number; end?: number | undefined;}} selection The selection value.
 * @optional @prop {(unknown) => void} onSelectionChange The function to be called on a selection.
 */

const Form: React.FC<Props> = (props: Props) => {
  const style: any = StyleSheet.create({
    container: {
      backgroundColor: "#E5E5E5",
      width: props.width || "80%",
      justifyContent: "center",
      padding: 20,
      paddingVertical: Platform.OS === "android" ? 15 : 20,
      height: props?.height,
      borderRadius: 20,
      margin: Platform.OS === "android" ? -10 : 0,
    },
  });

  return (
    <View style={style.container}>
      <TextInput
        onKeyPress={props.onKeyPress}
        placeholder={props.placeholder}
        onChangeText={props.onTextChange}
        secureTextEntry={props.safeEntry || false}
        value={props.value}
        multiline={props?.multiline || false}
        placeholderTextColor={"#C7C7CD"}
        selection={props.selection}
        onSelectionChange={props.onSelectionChange}
      />
    </View>
  );
};

export default Form;
