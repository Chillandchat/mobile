import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { FormProps } from "./index.d";

/**
 * This is the form component this component will allow the user to input text.
 *
 * @prop {string} placeholder The placeholer of the form.
 * @prop {(text: string) => void} onChangeText The event that will be called when the text is changed.
 * @optional @prop {boolean} safeEntry Whether the text is secure or not.
 */

namespace Form {
  export const component: React.FC<FormProps> = (props: FormProps) => {
    const style: any = StyleSheet.create({
      container: {
        backgroundColor: "#E5E5E5",
        width: "80%",
        justifyContent: "center",
        padding: 20,
        borderRadius: 10000,
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
}

export default Form.component;
