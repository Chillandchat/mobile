import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Signup: React.FC = () => {
  const style = StyleSheet.create({
    container: {
      justifyContent: "center",
    },
    text: {
      fontFamily: "poppins",
    },
  });
  return (
    <View style={style.container}>
      <Text style={style.text}>Signup</Text>
    </View>
  );
};

export default Signup;
