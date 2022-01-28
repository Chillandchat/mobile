import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Error: React.FC = () => {
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
      <Text style={style.text}>Error</Text>
    </View>
  );
};

export default Error;
