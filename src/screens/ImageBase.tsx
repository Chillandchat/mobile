import React from "react";
import { View, Text, StyleSheet } from "react-native";

//! WORK-IN-PROGRESS

const ImageBase: React.FC = () => {
  const style: any = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={style.container}>
      <Text>Hello</Text>
    </View>
  );
};

export default ImageBase;
