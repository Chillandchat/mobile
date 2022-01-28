import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Login: React.FC<any> = ({ navigation }) => {
  const style = StyleSheet.create({
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
        onPress={() => {
          navigation.navigate("chat");
        }}
        title={"Press me"}
      ></Button>
    </View>
  );
};

export default Login;
