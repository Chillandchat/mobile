import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { FormProps } from "./index.d";

const Form: React.FC<FormProps> = (props: FormProps) => {
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
        secureTextEntry={props.safeEntry}
      />
    </View>
  );
};

export default Form;
