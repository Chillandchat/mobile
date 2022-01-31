import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";

const Login: React.FC = () => {
  const style: any = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    text: {
      fontFamily: "poppins",
    },
  });
  return (
    <View style={style.container}>
      <Text style={style.text}>Login</Text>
      <Button
        onPress={(): void => {
          //! DUMMY FUNCTION - REMOVE BEFORE PRODUCTION
          return;
        }}
        color={"#00AD98"}
        textColor={"#ffff"}
        text={"login"}
      />
    </View>
  );
};

export default Login;
